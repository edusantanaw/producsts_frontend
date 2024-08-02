# TESTE REACT

## Organização de pastas
* @types: A pasta @types é onde estão localizados os nossos tipos globais.
* pages: A pasta pages é onde estão localizadas as páginas disponíveis no sistema e também seus subcomponentes..
* routes: A pasta routes é onde registramos as nossas rotas.
* services: A pasta services é onde estão localizadas as funções que acessam sistemas externos como a nossa aplicação backend.
* shared: A pasta shared é onde estão localizados os componentes, constantes, utilitarios, estilos, contextos e hooks que podem ser reutilizados em diversas partes da aplicação.


![alt text](./readme/image.png)

## Como utilizar os componentes criados?
Para o uso dos componentes criados, basta conferir as interfaces definidas no próprio arquivo onde está localizado o componente:

```ts
type props<T, R> = {
  route: string;
  dependences?: unknown[];
  getResponse: (data: R) => T[];
};

export function useFetchList<T extends hasId, R>({
  route,
  dependences = [],
  getResponse,
}: props<T, R>) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

```

## Como executar o projeto?

Primeiramente será necessário alterar a VITE_BASE_URL que está localizada no arquivo .env

```env 
VITE_BASE_URL="http://localhost:8080"
```
Após isto, é só executar os seguintes comandos no terminal: 

```.sh
  npm install
  npm run dev
```

## Tecnologias utilizadas
* ReactJs
* Typescript
* Styled-components
* Axios
* React-icons
