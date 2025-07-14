# 👻 Ghost Pals

**Uncover who you follow on Instagram that doesn't follow you back.**

> Ever wondered about your "ghost" followers on Instagram? Ghost Pals is a simple, privacy-focused web app that helps you quickly see which accounts you follow that don't follow you back, and vice-versa. No data is ever uploaded to a server; all the magic happens directly in your browser.

---

### ✨ Key Features

-   **Client-Side Processing:** Your data stays yours. All file reading and comparison happens in your browser.
-   **Two-Way Analysis:** See both users who don't follow you back and users you don't follow back.
-   **Easy to Use:** A clean and simple interface for uploading your Instagram data files.
-   **Copy to Clipboard:** Easily copy the lists of usernames for your own use.
-   **Dark Mode:** Sleek and easy on the eyes.

---

### 🚀 How It Works

1.  **Request Your Data from Instagram:**
    -   Go to your Instagram profile → `Your Activity` → `Download Your Information`.
    -   Request a download. Make sure to select **JSON** as the format.
    -   You only need the `followers_and_following` data category.

2.  **Download and Extract:**
    -   You'll get an email from Instagram when your data is ready.
    -   Download the `.zip` file and extract it.

3.  **Upload to Ghost Pals:**
    -   Navigate to the "Calculate" page on Ghost Pals.
    -   Inside the extracted folder, find `followers_and_following`.
    -   Upload `followers_1.json` and `following.json`.

4.  **See the Results:**
    -   The app will instantly show you the accounts that don't follow you back and the ones you don't follow.

---

### 🛠️ Tech Stack

-   **Framework:** [Next.js](https://nextjs.org/)
-   **Language:** [TypeScript](https://www.typescriptlang.org/)
-   **Styling:** [Tailwind CSS](https://tailwindcss.com/)
-   **UI Components:** [shadcn/ui](https://ui.shadcn.com/)
-   **Icons:** [Lucide React](https://lucide.dev/)

---

### 本地开发 (Getting Started)

To run this project locally, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/ghostpals.git
    cd ghostpals
    ```

2.  **Install dependencies:**
    ```bash
    bun install
    ```

3.  **Run the development server:**
    ```bash
    bun run dev
    ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

### 🔒 Privacy

We take your privacy seriously. Ghost Pals is built to be a 100% client-side application. This means your Instagram data files are never uploaded to any server. All the analysis is performed directly on your computer within your web browser.

---

### 🤝 Contributing

Contributions are welcome! If you have ideas for improvements or find a bug, feel free to open an issue or submit a pull request.

---

### 📄 License

This project is licensed under the MIT License. See the `LICENSE` file for details.