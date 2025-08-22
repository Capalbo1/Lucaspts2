# api/sigtap.py - Substitua pelo código completo
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
from pathlib import Path
from typing import List, Dict, Optional
import asyncio

app = FastAPI(title="SIGTAP API - Busca Rápida")

# Habilitar CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Caminho para sua planilha Excel
EXCEL_PATH = Path(r"C:\Users\SALETE\Desktop\analise de exames\Lucaspts2\tabela sigtap.xlsx")

# Cache dos procedimentos
PROCEDIMENTOS = []

def carregar_planilha_excel():
    """Carrega a planilha Excel"""
    try:
        if not EXCEL_PATH.exists():
            raise FileNotFoundError(f"Arquivo não encontrado: {EXCEL_PATH}")
        
        print(f"📖 Carregando planilha: {EXCEL_PATH}")
        
        # Lê o Excel - ajuste se necessário
        df = pd.read_excel(
            EXCEL_PATH,
            sheet_name=0,
            usecols=[0, 1, 5],  # Colunas A, B, F
            names=['codigo', 'nome', 'dias_permanencia'],
            dtype=str,
            header=0
        )
        
        # Limpeza dos dados
        df = df.dropna(subset=['codigo', 'nome'])
        df = df.fillna('')
        
        df['codigo'] = df['codigo'].astype(str).str.strip()
        df['nome'] = df['nome'].astype(str).str.strip()
        df['dias_permanencia'] = df['dias_permanencia'].astype(str).str.strip()
        
        # Converte para lista de dicionários
        procedimentos = df.to_dict('records')
        
        print(f"✅ {len(procedimentos)} procedimentos carregados")
        return procedimentos
        
    except Exception as e:
        print(f"❌ Erro ao carregar Excel: {e}")
        # Dados de fallback
        return [
            {'codigo': '0201010010', 'nome': 'CONSULTA EM CLINICA MEDICA', 'dias_permanencia': '1'},
            {'codigo': '0201010029', 'nome': 'CONSULTA EM PEDIATRIA', 'dias_permanencia': '1'},
            {'codigo': '0301010076', 'nome': 'ELETROCARDIOGRAMA', 'dias_permanencia': '1'},
            {'codigo': '0401010123', 'nome': 'ULTRASSONOGRAFIA', 'dias_permanencia': '1'},
            {'codigo': '0501010150', 'nome': 'APENDICECTOMIA', 'dias_permanencia': '3'}
        ]

@app.on_event("startup")
async def startup_event():
    """Carrega a planilha quando o servidor inicia"""
    global PROCEDIMENTOS
    PROCEDIMENTOS = carregar_planilha_excel()
    print("🚀 Servidor pronto!")

@app.get("/")
async def root():
    return {"message": "SIGTAP API funcionando", "total_procedimentos": len(PROCEDIMENTOS)}

@app.get("/procedimentos/busca")
async def buscar_procedimentos(
    termo: Optional[str] = "",
    limite: int = 50
):
    """Busca por procedimentos"""
    try:
        if not PROCEDIMENTOS:
            return {"procedimentos": [], "total": 0, "termo": termo}
        
        termo_busca = (termo or "").lower().strip()
        resultados = []
        
        if not termo_busca:
            # Se não há termo, retorna vazio ou alguns exemplos
            return {
                "procedimentos": [],
                "total": 0,
                "termo": termo
            }
        
        # Busca eficiente
        for proc in PROCEDIMENTOS:
            nome = proc['nome'].lower()
            codigo = proc['codigo'].lower()
            
            if (termo_busca in nome or 
                termo_busca in codigo or
                codigo.startswith(termo_busca)):
                
                resultados.append(proc)
                
                if len(resultados) >= limite:
                    break
        
        return {
            "procedimentos": resultados,
            "total": len(resultados),
            "termo": termo
        }
        
    except Exception as e:
        print(f"Erro na busca: {e}")
        return {"procedimentos": [], "total": 0, "erro": str(e)}

@app.get("/procedimentos/sugestoes")
async def sugestoes_procedimentos(
    termo: Optional[str] = "",
    limite: int = 5
):
    """Sugestões para autocomplete"""
    try:
        if not PROCEDIMENTOS or not termo:
            return {"sugestoes": []}
        
        termo_busca = termo.lower().strip()
        sugestoes = []
        
        for proc in PROCEDIMENTOS:
            nome = proc['nome'].lower()
            codigo = proc['codigo'].lower()
            
            if (termo_busca in nome or 
                termo_busca in codigo or
                codigo.startswith(termo_busca)):
                
                sugestoes.append({
                    'codigo': proc['codigo'],
                    'nome': proc['nome'],
                    'dias': proc['dias_permanencia']
                })
                
                if len(sugestoes) >= limite:
                    break
        
        return {"sugestoes": sugestoes}
        
    except Exception as e:
        print(f"Erro nas sugestões: {e}")
        return {"sugestoes": []}

@app.get("/procedimentos/{codigo}")
async def get_procedimento_por_codigo(codigo: str):
    """Busca um procedimento específico"""
    try:
        codigo = codigo.strip()
        
        for proc in PROCEDIMENTOS:
            if proc['codigo'] == codigo:
                return {"procedimento": proc}
        
        return {"procedimento": None, "erro": "Não encontrado"}
        
    except Exception as e:
        return {"procedimento": None, "erro": str(e)}

@app.get("/health")
async def health_check():
    return {
        "status": "healthy",
        "total_procedimentos": len(PROCEDIMENTOS),
        "planilha": str(EXCEL_PATH.name)
    }