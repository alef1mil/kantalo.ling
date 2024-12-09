#!/usr/bin/env node

const fs = require('fs');

class KantaloInterpreter {
  constructor() {
    this.variables = {};
    this.functions = {};
  }

  loadCode(code) {
    const lines = code.split('\n').map(line => line.trim()).filter(line => line);
    lines.forEach((line, index) => {
      this.interpretLine(line, index + 1);
    });
  }

  interpretLine(line, linenumber) {
    if (line.startsWith("var.save")) {
      this.setVariavel(line)
    } else if (line.startsWith("terminal.text")) {
      const texto = line.match(/"(.*?)"/)[1]
      if (texto) {
        const variable = texto.replace(/-\*([^*]+)\*-/g, (_, varName) => this.variables[varName] || `-*${varName}*-`)
        console.log(variable.replace(/"/g, ''))

      }
    } else if (line.startsWith("func")) {
      console.log("[ WARNING ] A funcaçao func esta em desenvolvimento")
    } else if (line.startsWith("##")) {
      return
    } else {
      throw new Error(`Comando nao intentificado: ${linenumber} - ${line}`)
    }
  }

  setVariavel(line) {
    const match = line.match(/var\.save (\w+) = "(.*)"/);
    if (match) {
      const [, varName, value] = match
      this.variables[varName] = value
    }
  }
}

const args = process.argv.slice(2);
if (args.length !== 1) {
  console.error("Uso: klo <script.klo>");
  process.exit(1);
}
if (args[0] == "-v") {
  console.log("KANTALO VERSION 0.0.1-BETA.1")
  process.exit(1)
}

const fileName = args[0];
const interpreter = new KantaloInterpreter();

try {
  const code = fs.readFileSync(fileName, 'utf-8');
  console.log("=====================================================")
  console.log("                 KANTALO EXCUTE")
  console.log("                 VERSION: 0.0.1-BETA.2")
  console.log("=====================================================")
  interpreter.loadCode(code);
} catch (error) {

  console.log("=====================================================")
  console.log("                 KANTALO ERROR")
  console.log("=====================================================")
  console.error(`Erro ao carregar o arquivo: ${error.message}`);
  process.exit(1)
}
