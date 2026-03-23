import argparse
import os
import sys
from datetime import datetime
from pathlib import Path
from typing import List, Dict, Any, Tuple

import yaml
from anthropic import Anthropic


AGENT_DIR = Path(__file__).parent
ROOT_DIR = AGENT_DIR.parent


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


def load_context_docs(context_dir: Path) -> str:
    if not context_dir.exists():
        return ""
    files = sorted(f for f in context_dir.iterdir() if f.suffix == ".md")
    if not files:
        return ""
    parts = [f.read_text(encoding="utf-8") for f in files]
    return "\n\n---\n\n".join(parts)


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


def build_system_prompt(skills: List[Dict[str, Any]], context: str, include_body: bool = False) -> str:
    lines = []

    if context:
        lines.append(context)
        lines.append("\n---\n")

    lines.append("Você é um agente de automação da Agio Engenharia.")
    lines.append("Use as skills abaixo como guia para executar a tarefa do usuário.")
    lines.append("Responda sempre em português (pt-BR).\n")

    for skill in skills:
        lines.append(f"## Skill: {skill['name']}")
        lines.append(f"**Quando usar:** {skill['description']}\n")
        if include_body and skill["body"]:
            lines.append(skill["body"])
            lines.append("")
    return "\n".join(lines)


def main():
    args = parse_args()

    api_key = os.environ.get("ANTHROPIC_API_KEY")
    if not api_key:
        print("Erro: ANTHROPIC_API_KEY não está definida.")
        print("Configure com: export ANTHROPIC_API_KEY=sk-...")
        sys.exit(1)

    config = load_config(AGENT_DIR / "config.yaml")
    model = args.model or config.get("default_model", "claude-sonnet-4-6")
    skills_dir = ROOT_DIR / config.get("skills_dir", "./skills").lstrip("./")
    output_dir = Path(args.output_dir) if args.output_dir else ROOT_DIR / config.get("output_dir", "./output/raw").lstrip("./")
    context_dir = ROOT_DIR / "web" / "src" / "context-docs"

    all_skills = discover_skills(skills_dir)
    preferred = [s.strip() for s in args.skills.split(",") if s.strip()] if args.skills else []
    selected_skills = filter_skills(all_skills, preferred)

    context = load_context_docs(context_dir)

    print("=== Skills Agent ===")
    print(f"Tarefa  : {args.task}")
    print(f"Modelo  : {model}")
    print(f"Skills  : {', '.join(s['name'] for s in selected_skills)}")
    print(f"Contexto: {'Carregado' if context else 'Não encontrado'}\n")

    system_prompt = build_system_prompt(selected_skills, context, include_body=bool(preferred))

    try:
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
            timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
            out_file = output_dir / f"output_{timestamp}.md"
            out_file.write_text(result_text, encoding="utf-8")
            print(f"Resultado salvo em: {out_file}")
            print(f"Tokens usados: {final.usage.input_tokens} entrada / {final.usage.output_tokens} saída")
        else:
            print("[INFO] Execução concluída sem saída persistida.")

    except Exception as e:
        print(f"\nErro durante execução: {e}", file=sys.stderr)
        sys.exit(1)


if __name__ == "__main__":
    main()
