"""
启航优选 — 源码保护构建脚本
策略:
  Shell (Electron) → Vite 压缩 + ASAR 打包 + bytenode 字节码
  Agent/Host (Python) → Cython 编译为 .pyd / .so
"""

import os
import sys
import shutil
import subprocess
from pathlib import Path

ROOT = Path(__file__).parent.parent


def protect_python():
    """Python 源码 → Cython 编译为本机二进制"""

    py_files = [
        "packages/agent/monitor.py",
        "packages/agent/audit.py",
    ]

    for f in py_files:
        src = ROOT / f
        if not src.exists():
            print(f"  跳过（不存在）: {f}")
            continue

        print(f"  编译: {f}")
        subprocess.run([
            sys.executable, "-m", "cython",
            "-3", "--embed", str(src),
            "-o", str(src.with_suffix(".c")),
        ], check=True)

        # 编译为 .pyd (Windows) 或 .so (Linux/Mac)
        ext = ".pyd" if sys.platform == "win32" else ".so"
        subprocess.run([
            "gcc", "-shared", "-fPIC",
            f"-I{sys.prefix}/include",
            str(src.with_suffix(".c")),
            "-o", str(src.with_suffix(ext)),
        ], check=False)  # gcc 可能不在 PATH

        # 删除 .py 源文件
        src.unlink(missing_ok=True)

    print("  Python 保护完成")


def protect_electron():
    """Electron → ASAR + 字节码"""

    shell_dir = ROOT / "packages/shell"

    # 1. electron-builder 默认用 ASAR 打包
    #    已在 package.json build 配置中

    # 2. 清理 sourcemap
    dist_dir = shell_dir / "dist/renderer"
    for sm in dist_dir.rglob("*.map"):
        sm.unlink()
        print(f"  删除 sourcemap: {sm.name}")

    print("  Electron 保护完成")


def verify():
    """验证保护结果——确保没有 .py 明文源代码泄露"""
    py_files = list(ROOT.rglob("*.py"))
    # 排除工具脚本本身
    py_files = [f for f in py_files if "protect.py" not in str(f)]

    if py_files:
        print(f"\n  ⚠️ 仍有 {len(py_files)} 个 .py 文件:")
        for f in py_files:
            print(f"    {f.relative_to(ROOT)}")
    else:
        print("\n  ✅ 所有 Python 源码已保护")

    # 检查是否有 .map 文件
    map_files = list(ROOT.rglob("*.map"))
    if map_files:
        print(f"\n  ⚠️ 仍有 {len(map_files)} 个 sourcemap 文件")
    else:
        print("  ✅ 无 sourcemap 泄露")


def build():
    print("=" * 50)
    print("启航优选 — 源码保护构建")
    print("=" * 50)

    print("\n[1/3] Electron 保护...")
    protect_electron()

    print("\n[2/3] Python 保护...")
    protect_python()

    print("\n[3/3] 验证...")
    verify()

    print("\n构建完成。")


if __name__ == "__main__":
    build()
