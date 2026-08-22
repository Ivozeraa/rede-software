# Motion System — Rede Software

## Motion personality

**Corporate / Professional**. Movimento transmite confiança, clareza e prontidão. Evitamos bounce excessivo, efeitos chamativos e animação contínua sem função.

## Decision rules

1. **Purpose first:** toda animação deve orientar, confirmar ou criar hierarquia.
2. **Primary property:** priorizar `transform` e `opacity`; usar sombra/cor como camada secundária.
3. **Directional easing:** entradas desaceleram; saídas aceleram.
4. **No linear spatial motion:** movimento espacial nunca usa `linear`.
5. **Small amplitudes:** hover e feedback não devem deslocar o layout.
6. **Choreography:** em blocos, o elemento principal entra primeiro e os suportes acompanham em pequenos atrasos.
7. **Mobile:** reduzir amplitude, duração e quantidade de elementos simultâneos.
8. **Accessibility:** `prefers-reduced-motion` desativa deslocamentos, stagger e loops contínuos.

## Timing tokens

| Uso | Duração |
|---|---:|
| Microfeedback / tooltip | 100–150ms |
| Botão / toggle | 150–180ms |
| Ícone | 180–220ms |
| Card / painel | 240–320ms |
| Entrada de página | 450–560ms |
| Ambientação | 6–12s |

## Easing

- `--ease-motion-enter`: `cubic-bezier(0.2, 0, 0, 1)`
- `--ease-motion-standard`: `cubic-bezier(0.2, 0, 0.2, 1)`
- `--ease-motion-exit`: `cubic-bezier(0.4, 0, 1, 1)`

## Motion layers

- **Primary:** entrada/saída com `opacity + translateY`.
- **Secondary:** sombra e pequena alteração de escala nos elementos interativos.
- **Ambient:** os glows vermelhos do hero respiram lentamente, sem chamar mais atenção que o conteúdo.

## Choreography

Na Home, cada seção entra em sequência curta, com no máximo ~300ms de orçamento total de stagger. O objetivo é sugerir continuidade, não criar uma apresentação cinematográfica.

## Reduced motion

Com `prefers-reduced-motion: reduce`, entradas viram fade simples, loops ambientais param, hover não desloca elementos e todos os tempos são reduzidos ao mínimo.

## Quality checklist

- [x] Não usar `linear` para movimento espacial.
- [x] Não depender apenas de opacity em estados importantes.
- [x] Evitar deslocamentos grandes.
- [x] Manter personalidade consistente.
- [x] Respeitar acessibilidade e mobile.
- [x] Manter motion como suporte ao conteúdo, nunca como protagonista.
