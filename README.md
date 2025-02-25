# Dragon Float

## English Version

### Overview
Welcome to **Dragon Float**, an immersive and visually captivating anime catalog web application designed for educational purposes and personal learning. This project serves as a portfolio piece and a practical exercise in web development, featuring a modern interface, dynamic themes, and a gallery of anime titles expected or confirmed for 2025. It is built to run offline using static data, with optional integration for fetching images via the Jikan API, and is intended for learning and experimentation—it may contain technical imperfections or areas for improvement, reflecting its role as a developmental project.

This documentation is provided in both English and Portuguese to ensure accessibility for a broader audience. The application is not intended for production use but rather as a demonstration of HTML, CSS, and JavaScript skills, with all content and interactions tailored for an engaging, anime-focused experience.

### Project Details
- **What’s Included**: The project comprises three main files:
  - `index.html`: The structural foundation of the site, containing the layout for the navigation, anime gallery, modal, loading indicator, and footer, with accessibility features and ARIA labels.
  - `style.css`: The styling layer, featuring responsive design, four customizable themes (Dark Fantasy, Earthy Fantasy, Futuristic Sci-Fi, Vibrant Nostalgia), smooth animations, and a visually appealing gradient background.
  - `script.js`: The logic layer, handling anime data management, pagination, search functionality, theme switching, modal interactions, image fetching via the Jikan API, and offline caching with local storage, all using static data from `animes2025`.
- **Technologies Used**:
  - **HTML5**: Provides the semantic structure and ensures accessibility with ARIA attributes, keyboard navigation, and Portuguese-language labels for all interactive elements.
  - **CSS3**: Implements responsive design, animations, transitions, and theme switching using CSS Grid, Flexbox, and keyframe animations, with a focus on visual aesthetics and user experience.
  - **JavaScript (ES6)**: Manages dynamic content, including loading anime data, pagination (12 animes per page, with a "Load More" button for 14 additional animes), real-time search, modal popups with carousels, theme persistence via local storage, and image fetching from the Jikan API, all functioning offline with a static dataset.
- **Features**:
  - A gallery displaying up to 26 anime titles from 2025, divided into 12 initial cards and 14 more via the "Load More" button, with hover effects, grid layout, and thematic styling.
  - Four distinct themes (Dark Fantasy, Earthy Fantasy, Futuristic Sci-Fi, Vibrant Nostalgia) that users can switch between via a dropdown menu, each with unique gradient backgrounds, animations, and color schemes, saved in local storage.
  - A search bar for filtering animes by title or genre in real-time, with debounced input for performance optimization.
  - A modal popup for each anime, displaying title, genres, episodes (if available), synopsis, and a carousel of additional images fetched via the Jikan API, with fullscreen image viewing and navigation controls.
  - Smooth animations for gallery card appearances, theme transitions, modal openings, and loading states, enhancing user engagement.
  - Offline caching using local storage to store anime data and themes, ensuring persistence across sessions without internet access.
  - A responsive design that adapts to desktops, tablets, and mobile devices, with media queries for breakpoints at 900px, 600px, and 400px.
  - A loading indicator with a spinning animation, displayed during data or image loading, improving user feedback.
  - A "Back to Top" button for easy navigation on long pages, appearing when scrolling down more than 300px.
  - A footer with credits linking to your GitHub profile (`https://github.com/opswesley`), styled to match the site’s themes.
  - Accessibility features, including ARIA labels, keyboard navigation (e.g., Esc to close the modal), and high-contrast elements for better usability.
- **Additional Notes**: This project is a learning tool and may have bugs, performance issues, or design limitations. It uses a static list of 26 anime titles (`animes2025`) for 2025, with placeholder images if Jikan API requests fail, and is not optimized for production use. The focus is on practicing web development concepts like responsiveness, animations, APIs, and state management, with all text and interactions designed for an anime enthusiast audience.

### How to Use
1. Clone or download this repository to your local machine.
2. Open the `index.html` file in any modern web browser (no internet connection is required for basic functionality, as it uses static data).
3. Explore the anime gallery, initially displaying 12 anime cards. Click "Load More" to view the remaining 14 animes (if not visible due to CSS limitations, check the DOM in developer tools or adjust `.gallery` CSS).
4. Use the search bar to filter animes by title or genre, typing in real-time.
5. Click any anime card to open a modal with detailed information, including a carousel of images (fetched from Jikan if online, otherwise using placeholders).
6. Switch themes using the "Themes" dropdown in the navigation bar to experience Dark Fantasy, Earthy Fantasy, Futuristic Sci-Fi, or Vibrant Nostalgia, with changes persisting across sessions via local storage.
7. Navigate the modal with keyboard controls (Esc to close) or mouse clicks for images and the close button.
8. Use the "Back to Top" button (visible after scrolling) to return to the top of the page quickly.
9. The site works offline after the initial load, with cached data and themes stored in local storage, but image fetching requires an internet connection for Jikan API calls.

### What to Expect
- A visually stunning, anime-themed interface with dynamic gradients, animations, and theme switching, optimized for learning and experimentation.
- Responsive behavior across devices, but the gallery layout may require CSS adjustments (e.g., `overflow: auto`) to display all 26 animes, as the current CSS limits visibility to 12 cards.
- Potential API rate limits or failures with Jikan, handled by fallback placeholders (`https://placekitten.com/150/200` for thumbnails, `https://placekitten.com/400/600` for full images).
- Offline functionality for core features (gallery, search, themes) using static data, but online access for image carousels via Jikan.
- Engaging user interactions with smooth animations, but possible performance issues due to large datasets or API delays, reflecting its educational nature.
- Technical highlights include CSS Grid and Flexbox for layout, keyframe animations for visual effects, local storage for persistence, and debouncing for search performance, all implemented as a learning exercise.

### Preview
![Dragon Float Preview](https://i.postimg.cc/NFpGGNcp/image.png)

### Getting the API
This project uses the **Jikan API** (https://jikan.moe) to fetch anime images for the gallery and modal carousels. Here’s how to obtain and use it:

- **What is Jikan?**: Jikan is a free, unofficial REST API for MyAnimeList (MAL) that provides access to anime, manga, and character data, including images. It’s ideal for educational projects like Dragon Float.
- **How to Get Started**:
  1. Visit the Jikan documentation at [https://jikan.moe/docs/](https://jikan.moe/docs/) to explore available endpoints and rate limits.
  2. No API key or registration is required to use Jikan—just make HTTP requests to the API endpoints (e.g., `https://api.jikan.moe/v4/anime?q={title}&limit=1` for anime searches or `https://api.jikan.moe/v4/anime/{mal_id}/pictures` for additional images).
  3. Be aware of rate limits: Jikan has a limit of approximately 60 requests per minute per IP address. If you exceed this, the API returns a 429 status, and the project includes retry logic with a 1-second delay (handled in `fetchAnimeImage` and `fetchAdditionalImages`).
  4. Test your requests using tools like Postman or cURL, or integrate directly into your JavaScript code as shown in this project.
  5. For offline use or fallback, the project uses placeholder images (`https://placekitten.com/150/200` and `https://placekitten.com/400/600`) if Jikan fails or is unavailable.
- **Documentation**: Refer to the Jikan documentation for detailed endpoint descriptions, response formats, and best practices. The API is versioned (currently v4), and updates may occur, so check periodically.
- **Limitations**: Jikan is free but may experience downtime or rate limiting, which this project mitigates with retries and placeholders. It’s not suitable for high-traffic production use without caching or premium alternatives.

If you need to replace or extend the API, consider alternatives like MyAnimeList’s official API (requires registration) or other anime databases, but Jikan is sufficient for this educational project.

### License
This project is licensed under the [MIT License](LICENSE), which permits free use, modification, and distribution, making it ideal for open-source, educational projects like Dragon Float. You are welcome to fork, modify, or build upon this code for learning purposes, but it comes with no warranty due to its experimental nature.

---

## Versão em Português

### Visão Geral
Bem-vindo ao **Dragon Float**, um aplicativo web cativante e visualmente impressionante de catálogo de animes, desenvolvido com propósitos educacionais e aprendizado pessoal. Este projeto funciona como uma peça de portfólio e um exercício prático em desenvolvimento web, apresentando uma interface moderna, temas dinâmicos e uma galeria de títulos de animes esperados ou confirmados para 2025. Ele é projetado para funcionar offline com dados estáticos, com integração opcional para buscar imagens via a API Jikan, e é destinado ao aprendizado e experimentação—pode conter imperfeições técnicas ou áreas para melhorias, refletindo seu papel como um projeto de desenvolvimento.

Esta documentação é fornecida em inglês e português para garantir acessibilidade a um público mais amplo. O aplicativo não é destinado a uso em produção, mas sim como uma demonstração de habilidades em HTML, CSS e JavaScript, com todo o conteúdo e interações projetados para uma experiência focada em animes.

### Detalhes do Projeto
- **O que Inclui**: O projeto é composto por três arquivos principais:
  - `index.html`: A base estrutural do site, contendo o layout para a navegação, galeria de animes, modal, indicador de carregamento e rodapé, com recursos de acessibilidade e rótulos ARIA.
  - `style.css`: A camada de estilização, com design responsivo, quatro temas personalizáveis (Fantasia Escura, Fantasia Terrosa, Ficção Científica Futurista, Nostalgia Vibrante), animações suaves e um fundo gradiente visualmente atraente.
  - `script.js`: A camada de lógica, gerenciando os dados dos animes, paginação, funcionalidade de busca, troca de temas, interações com o modal, busca de imagens via API Jikan e cache offline com armazenamento local, usando dados estáticos de `animes2025`.
- **Tecnologias Utilizadas**:
  - **HTML5**: Fornece a estrutura semântica e garante acessibilidade com atributos ARIA, navegação por teclado e rótulos em português para todos os elementos interativos.
  - **CSS3**: Implementa design responsivo, animações, transições e troca de temas usando Grid CSS, Flexbox e animações por keyframes, com foco em estética visual e experiência do usuário.
  - **JavaScript (ES6)**: Gerencia o conteúdo dinâmico, incluindo carregamento de dados de animes, paginação (12 animes por página, com um botão "Carregar Mais" para mais 14 animes), busca em tempo real, popups de modal com carrossel, persistência de temas via armazenamento local e busca de imagens na API Jikan, funcionando offline com um conjunto de dados estáticos.
- **Recursos**:
  - Uma galeria exibindo até 26 títulos de animes de 2025, divididos em 12 cards iniciais e mais 14 via o botão "Carregar Mais", com efeitos de hover, layout em grade e estilização temática.
  - Quatro temas distintos (Fantasia Escura, Fantasia Terrosa, Ficção Científica Futurista, Nostalgia Vibrante) que os usuários podem trocar pelo menu "Temas" na navegação, cada um com fundos gradientes únicos, animações e esquemas de cores, salvos no armazenamento local.
  - Uma barra de busca para filtrar animes por título ou gênero em tempo real, com entrada debounced para otimização de desempenho.
  - Um popup modal para cada anime, exibindo título, gêneros, episódios (se disponíveis), sinopse e um carrossel de imagens buscadas via API Jikan, com visualização em tela cheia e controles de navegação.
  - Animações suaves para a aparição de cards na galeria, transições de temas, abertura de modais e estados de carregamento, aumentando o engajamento do usuário.
  - Cache offline usando armazenamento local para armazenar dados de animes e temas, garantindo persistência entre sessões sem necessidade de internet.
  - Design responsivo que se adapta a desktops, tablets e dispositivos móveis, com media queries para pontos de quebra em 900px, 600px e 400px.
  - Um indicador de carregamento com animação de giro, exibido durante o carregamento de dados ou imagens, melhorando o feedback ao usuário.
  - Um botão "Voltar ao Topo" para facilitar a navegação em páginas longas, aparecendo ao rolar mais de 300px.
  - Um rodapé com créditos linkando para seu perfil no GitHub (`https://github.com/opswesley`), estilizado para combinar com os temas do site.
  - Recursos de acessibilidade, incluindo rótulos ARIA, navegação por teclado (ex.: Esc para fechar o modal) e elementos de alto contraste para maior usabilidade.
- **Notas Adicionais**: Este projeto é uma ferramenta de aprendizado e pode apresentar bugs, problemas de desempenho ou limitações de design. Ele utiliza uma lista estática de 26 títulos de animes (`animes2025`) para 2025, com imagens placeholder caso as solicitações à API Jikan falhem, e não é otimizado para uso em produção. O foco é praticar conceitos de desenvolvimento web, como responsividade, animações, integração com APIs e gerenciamento de estado, com todo o texto e interações projetados para um público entusiasta de animes.

### Como Usar
1. Clone ou baixe este repositório para sua máquina local.
2. Abra o arquivo `index.html` em qualquer navegador web moderno (não é necessária conexão com a internet para a funcionalidade básica, pois usa dados estáticos).
3. Explore a galeria de animes, que inicialmente exibe 12 cards. Clique em "Carregar Mais" para visualizar os 14 animes restantes (se não aparecerem devido a limitações do CSS, verifique o DOM nas ferramentas de desenvolvedor ou ajuste o CSS de `.gallery`).
4. Use a barra de busca para filtrar animes por título ou gênero, digitando em tempo real.
5. Clique em qualquer card de anime para abrir um modal com informações detalhadas, incluindo um carrossel de imagens (buscadas do Jikan se online, caso contrário, usando placeholders).
6. Troque os temas usando o menu "Temas" na barra de navegação para experimentar Fantasia Escura, Fantasia Terrosa, Ficção Científica Futurista ou Nostalgia Vibrante, com alterações persistentes via armazenamento local.
7. Navegue pelo modal com controles de teclado (Esc para fechar) ou cliques do mouse nas imagens e no botão de fechar.
8. Use o botão "Voltar ao Topo" (visível após rolar para baixo) para retornar rapidamente ao topo da página.
9. O site funciona offline após o carregamento inicial, com dados e temas armazenados no armazenamento local, mas a busca por imagens requer conexão com a internet para chamadas à API Jikan.

### O Que Esperar
- Uma interface visualmente impressionante com temas de animes, gradientes dinâmicos, animações e troca de temas, otimizada para aprendizado e experimentação.
- Comportamento responsivo em todos os dispositivos, mas o layout da galeria pode exigir ajustes no CSS (ex.: `overflow: auto`) para exibir os 26 animes, já que o CSS atual limita a visibilidade a 12 cards.
- Possíveis limites de taxa ou falhas na API Jikan, tratadas com imagens placeholder (`https://placekitten.com/150/200` para thumbnails, `https://placekitten.com/400/600` para imagens completas).
- Funcionalidade offline para recursos principais (galeria, busca, temas) usando dados estáticos, mas acesso online para carrosséis de imagens via Jikan.
- Interações envolventes com animações suaves, mas possíveis problemas de desempenho devido a grandes conjuntos de dados ou atrasos na API, refletindo sua natureza educacional.
- Destaques técnicos incluem Grid CSS e Flexbox para layout, animações por keyframes para efeitos visuais, armazenamento local para persistência e debouncing para performance de busca, todos implementados como um exercício de aprendizado.

### Prévia
![Prévia do Dragon Float](https://i.postimg.cc/NFpGGNcp/image.png)

### Obtendo a API
Este projeto utiliza a **API Jikan** (https://jikan.moe) para buscar imagens de animes para a galeria e carrosséis de modais. Aqui está como obtê-la e usá-la:

- **O que é Jikan?**: Jikan é uma API REST gratuita e não oficial para MyAnimeList (MAL) que fornece acesso a dados de animes, mangás e personagens, incluindo imagens. É ideal para projetos educacionais como o Dragon Float.
- **Como Começar**:
  1. Visite a documentação do Jikan em [https://jikan.moe/docs/](https://jikan.moe/docs/) para explorar os endpoints disponíveis e os limites de taxa.
  2. Não é necessário chave de API ou registro para usar o Jikan—basta fazer solicitações HTTP aos endpoints (ex.: `https://api.jikan.moe/v4/anime?q={title}&limit=1` para buscas de animes ou `https://api.jikan.moe/v4/anime/{mal_id}/pictures` para imagens adicionais).
  3. Esteja atento aos limites de taxa: o Jikan tem um limite de aproximadamente 60 solicitações por minuto por endereço IP. Se excedido, a API retorna um status 429, e o projeto inclui lógica de re tentativa com um atraso de 1 segundo (tratado em `fetchAnimeImage` e `fetchAdditionalImages`).
  4. Teste suas solicitações usando ferramentas como Postman ou cURL, ou integre diretamente no código JavaScript, como mostrado neste projeto.
  5. Para uso offline ou como fallback, o projeto usa imagens placeholder (`https://placekitten.com/150/200` e `https://placekitten.com/400/600`) se o Jikan falhar ou estiver indisponível.
- **Documentação**: Consulte a documentação do Jikan para descrições detalhadas dos endpoints, formatos de resposta e melhores práticas. A API é versionada (atualmente v4), e atualizações podem ocorrer, então verifique periodicamente.
- **Limitações**: O Jikan é gratuito, mas pode sofrer quedas ou limites de taxa, o que este projeto mitiga com re tentativas e placeholders. Não é adequado para uso em produção com alto tráfego sem caching ou alternativas premium.

Se precisar substituir ou expandir a API, considere alternativas como a API oficial do MyAnimeList (requer registro) ou outros bancos de dados de animes, mas o Jikan é suficiente para este projeto educacional.

### Licença
Este projeto está licenciado sob a [Licença MIT](LICENSE), que permite uso gratuito, modificação e distribuição, sendo ideal para projetos open-source educacionais como o Dragon Float. Você pode fazer fork, modificar ou construir sobre este código para fins de aprendizado, mas ele é fornecido sem garantia devido à sua natureza experimental.