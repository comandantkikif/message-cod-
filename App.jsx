import { useState } from 'react'

    const generateCodeMap = () => {
      const letters = 'abcdefghijklmnopqrstuvwxyzéèàê'
      const codeMap = new Map()
      
      // Espace = 0
      codeMap.set(' ', '0')
      
      // Générer des codes pour chaque lettre
      letters.split('').forEach(letter => {
        const codeLength = Math.random() > 0.5 ? 1 : 2
        const code = Math.floor(Math.random() * (codeLength === 1 ? 10 : 100))
        codeMap.set(letter, code.toString().padStart(codeLength, '0'))
      })
      
      return codeMap
    }

    const codeMap = generateCodeMap()
    const decodeMap = new Map([...codeMap].map(([k, v]) => [v, k]))

    const encodeMessage = (text) => {
      return text.split('').map(char => {
        // Garder les chiffres entre _ inchangés
        if (char === '_') return '_'
        if (codeMap.has(char.toLowerCase())) {
          return codeMap.get(char.toLowerCase())
        }
        return char
      }).join('')
    }

    const decodeMessage = (code) => {
      let result = ''
      let i = 0
      while (i < code.length) {
        if (code[i] === '_') {
          result += '_'
          i++
          continue
        }
        
        // Essayer de décoder 2 chiffres d'abord
        const twoDigits = code.slice(i, i + 2)
        if (decodeMap.has(twoDigits)) {
          result += decodeMap.get(twoDigits)
          i += 2
        } else {
          // Essayer avec 1 chiffre
          const oneDigit = code[i]
          if (decodeMap.has(oneDigit)) {
            result += decodeMap.get(oneDigit)
            i++
          } else {
            result += oneDigit
            i++
          }
        }
      }
      return result
    }

    export default function App() {
      const [input, setInput] = useState('')
      const [output, setOutput] = useState('')

      const handleEncode = () => {
        setOutput(encodeMessage(input))
      }

      const handleDecode = () => {
        setOutput(decodeMessage(input))
      }

      const handleReset = () => {
        setInput('')
        setOutput('')
      }

      return (
        <div className="container">
          <h1>Codeur de Message</h1>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Entrez votre message ici..."
          />
          <div>
            <button onClick={handleEncode}>Coder</button>
            <button onClick={handleDecode}>Décoder</button>
            <button onClick={handleReset}>Réinitialiser</button>
          </div>
          <textarea
            value={output}
            readOnly
            placeholder="Résultat apparaîtra ici..."
          />
        </div>
      )
    }
