![Student-App-Banner](/src/app/opengraph-image.png)

# Student-App
An app for students to track their grades, homework, timetable, subjects and exams, and study with flashcards.

## Features
### Subjects
![Subjects](/docs/assets/subjects.png)
### Homework
![Homework](/docs/assets/homework.png)
### Calendar
![Calendar](/docs/assets/calendar.png)
### Exams
![Subject](/docs/assets/subject.png)
### Flashcards
![Flashcards](/docs/assets/flashcard_decks.png)
![Flashcards](/docs/assets/deck_stats.png)
![Flashcards](/docs/assets/practice.png)

## Self-Hosting

This guide will help you set up and run the Student App locally using Next.js and Supabase.

**Note**: As of 17-11-2024 only the school year with id 1 works in the app. And you have to create it manually in the supabase as well as the timetable and the subjects. Everything else can be done in the app.
### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or newer)
- [npm](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/)
- [Supabase Account](https://supabase.com/) (to obtain API credentials)

### Setup Instructions

1. **Clone the Repository**

   ```sh
   git clone https://github.com/johannesschiessl/Student-App.git
   cd student-app
   ```

2. **Install Dependencies**

   Using npm:

   ```sh
   npm install
   ```

   Or using Yarn:

   ```sh
   yarn install
   ```

3. **Environment Variables**

   Copy the `.env.example` file to create your `.env` file:

   On MacOS/Linux:

   ```sh
   cp .env.example .env
   ```

   On Windows:

   ```sh
   copy .env.example .env
   ```

   Edit the `.env` file with your `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`. These keys can be obtained from your Supabase dashboard.

4. **Set Up Supabase**

   Ensure you have the necessary tables and configurations in your Supabase instance. You can find the database schema in the `supabase` directory of this repository. Use the SQL commands provided there to initialize your database.
5. **Set up Google and/or Discord Login**
   Go to [https://console.cloud.google.com](https://console.cloud.google.com) and/or [https://discord.com/developers](https://discord.com/developers) and follow the steps to register the application and add the oauth secret to supabase.
6. **Run the Development Server**

   Start the Next.js development server:

   ```sh
   npm run dev
   ```

   Or if you're using Yarn:

   ```sh
   yarn dev
   ```

   The application should now be running on [http://localhost:3000](http://localhost:3000).

7. **Accessing the App**

   Visit `http://localhost:3000` in your browser to start using the Student App. You should be able to log in and start tracking your data once your Supabase backend is correctly set up.

### Troubleshooting

- Make sure all environment variables are set correctly in the `.env` file.
- Ensure your Supabase tables and policies match the required setup.
- Check the console for any error messages and address them accordingly.

## Contributing

Feel free to contribute by opening issues or pull requests. Any help to improve the app is greatly appreciated!

## License

This project is licensed under the MIT License. See the [LICENSE](/LICENSE) file for more information.
