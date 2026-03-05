import argparse
from pathlib import Path
from typing import List, Dict, Any, Tuple

import yaml
from anthropic import Anthropic


def parse_args():
    parser = argparse.ArgumentParser(description="Skills Agent CLI")
    parser.add_argument("--model", type=str, required=False,
                        help="Nome do modelo Claude (ex: claude-sonnet-4-6)")
    parser.add_argument("--task", type=str, required=True,
                        help="Tarefa em linguagem natural para o agente executar")
    parser.add_argument("--skills", type=str, required=False,
                        help="Lista de skills preferidas, separadas por vírgula (opcional)")
    parser.add_argument("--output-mode", type=str, default="file",
                        choices=["file", "stdout", "none"],
                        help="Como tratar a saída principal")
    parser.add_argument("--output-dir", type=str, default=None,
                        help="Diretório para salvar saídas quando output-mode=file")
    return parser.parse_args()


def load_config(config_path: Path) -> Dict[str, Any]:
    if config_path.exists():
        return yaml.safe_load(config_path.read_text(encoding="utf-8")) or {}
    return {}


def extract_skill(skill_md_path: Path) -> Tuple[Dict[str, Any], str]:
    """Retorna (frontmatter, body) de um SKILL.md."""
    text = skill_md_path.read_text(encoding="utf-8")
    if not text.startswith("---"):
        return {}, text

    parts = text.split("---", 2)
    if len(parts) < 3:
        return {}, text

    fm = yaml.safe_load(parts[1]) or {}
    body = parts[2].strip()
    return fm, body


def discover_skills(skills_dir: Path) -> List[Dict[str, Any]]:
    results = []
    if not skills_dir.exists():
        return results

    for folder in sorted(skills_dir.iterdir()):
        if not folder.is_dir():
            continue
        skill_md = folder / "SKILL.md"
        if not skill_md.exists():
            continue

        fm, body = extract_skill(skill_md)
        results.append({
            "name": fm.get("name") or folder.name,
            "description": fm.get("description") or "",
            "metadata": fm.get("metadata") or {},
            "body": body,
            "path": folder,
        })

    return results


def filter_skills(all_skills: List[Dict[str, Any]], preferred: List[str]) -> List[Dict[str, Any]]:
    if not preferred:
        return all_skills
    preferred_set = set(preferred)
    return [s for s in all_skills if s["name"] in preferred_set or s["path"].name in preferred_set]


def build_system_prompt(skills: List[Dict[str, Any]], include_body: bool = False) -> str:
    lines = [
        "Você é um agente de automação de marketing da Ágio.",
        "Use as skills abaixo como guia para executar a tarefa do usuário.\n",
    ]
    for skill in skills:
        lines.append(f"## Skill: {skill['name']}")
        lines.append(f"**Quando usar:** {skill['description']}\n")
        if include_body and skill["body"]:
            lines.append(skill["body"])
            lines.append("")
    return "\n".join(lines)


def main():
    args = parse_args()

    config = load_config(Path("./agent/config.yaml"))
    model = args.model or config.get("default_model", "claude-sonnet-4-6")
    skills_dir = Path(config.get("skills_dir", "./skills"))
    output_dir = Path(args.output_dir or config.get("output_dir", "./output/raw"))

    all_skills = discover_skills(skills_dir)
    preferred = [s.strip() for s in args.skills.split(",") if s.strip()] if args.skills else []
    selected_skills = filter_skills(all_skills, preferred)

    print("=== Skills Agent ===")
    print(f"Tarefa : {args.task}")
    print(f"Modelo : {model}")
    print(f"Skills : {', '.join(s['name'] for s in selected_skills)}\n")

    # Inclui o corpo completo só quando skills foram explicitamente escolhidas
    system_prompt = build_system_prompt(selected_skills, include_body=bool(preferred))
    client = Anthropic()
    result_text = ""

    if args.output_mode != "stdout":
        print("Executando...")

    with client.messages.stream(
        model=model,
        max_tokens=4096,
        system=system_prompt,
        messages=[{"role": "user", "content": args.task}],
    ) as stream:
        for text in stream.text_stream:
            if args.output_mode == "stdout":
                print(text, end="", flush=True)
            else:
                result_text += text
        final = stream.get_final_message()

    if args.output_mode == "stdout":
        print()
    elif args.output_mode == "file":
        output_dir.mkdir(parents=True, exist_ok=True)
        out_file = output_dir / "output.md"
        out_file.write_text(result_text, encoding="utf-8")
        print(f"Resultado salvo em: {out_file}")
        print(f"Tokens usados: {final.usage.input_tokens} entrada / {final.usage.output_tokens} saída")
    else:
        print("[INFO] Execução concluída sem saída persistida.")


if __name__ == "__main__":
    main()
