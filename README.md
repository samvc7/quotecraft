# Random Quotes Fetcher App

A simple and uplifting app designed to inspire and motivate you. In a world filled with challenges and moments of doubt, this app delivers small yet powerful doses of motivation to brighten your day and keep you going. Each quote serves as a reminder that positivity and encouragement are just a click away.

Whether you need a boost to start your day or a little encouragement to keep pushing forward, this app is here to help. Enable auto-fetch to let the inspiration flow continuously or manually fetch quotes whenever you need a moment of positivity.

---

## Features

- **Random Quotes**: Fetch a new random quote initially or with a button click.
- **Auto Fetch**: Enable or disable automatic fetching of new quotes every 10 seconds.
- **Filter Quotes**: Filter quotes by tags or author. 
- **Minimal UI**: Clean and user-friendly interface.

---

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/samvc7/quotecraft.git
   ```
2. Navigate to the project directory:
    ```bash
    cd quotecraft
    ```
3. Install dependencies:
    ```bash
    pnpm install
    ```
4. Start the application:
    ```bash
    pnpm dev
    ```

---

## Usage

1. Open the app in your browser:
    ```bash
    http://localhost:3000
    ```
2. **Fetch New Quote**: Click the "Next Quote" button to fetch a new random quote.
3. **Auto Fetch**: Toggle the auto-fetch button to enable or disable automatic quote fetching.
4. **Filter Quotes**: Select multiple tags or an author to filter quotes.

---

## Test

While dev server is running run following command:
- **Headed**:
    ```bash
    pnpm e2e
    ```
- **Playwright's UI mode**:
    ```bash
    pnpm e2e:ui
    ```
- **Headless**:
    ```bash
    pnpm e2e:cli
    ```
- **Report**:
    ```bash
    pnpm e2e:report
    ```

---

## Tech Stack

- **Frontend**: React, Typescipt, TailwindCSS
- **API**: [QuoteSlate API](https://quoteslate.vercel.app/) or [QuoteSlate Github](https://github.com/Musheer360/QuoteSlate)
- **Requests**: Fetch API
- **Tests**: [Playwright](https://playwright.dev/)

---

## Future Enhancements

- Replace API with [Quotable](https://github.com/lukePeavey/quotable) or create own backend
- Integrate with copy to clipboard feature to allow users to copy paste quotes anywhere.
- Save Filters to localstorage

---

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a feature branch:
    ```bash
    git checkout -b feature-name
    ```
3. Commit your changes:
    ```bash
    git commit -m "Add feature description"
    ```
4. Push to branch:
    ```bash
    git push origin feature-name
    ```
5. Submit a pull request.

---

## License
This project is licensed under the [MIT License](LICENSE).

---

## Acknowledgments

- [QuoteSlate API](https://quoteslate.vercel.app/)

---

### Author

Developed with ❤️ by Vicente Samuel Cala.
