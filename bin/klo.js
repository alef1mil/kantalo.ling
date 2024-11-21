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
        if (line.startsWith("var.create")) {
          this.setVariavel(line)
        } else if (line.startsWith("terminal.text")) {
          const texto = line.match(/"(.*?)"/)[1]
          if (texto) {
            console.log(texto)
          }
        } else if (line.startsWith("func")) {
          console.log("79**6")
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
        console.
      }
    }
}

const args = process.argv.slice(2);
if (args.length !== 1) {
    console.error("Uso: klo <script.klo>");
    process.exit(1);
}

const fileName = args[0];
const interpreter = new KantaloInterpreter();

try {
    const code = fs.readFileSync(fileName, 'utf-8');
    interpreter.loadCode(code);
} catch (error) {
   console.error(`Erro ao carregar o arquivo: ${error.message}`);
}