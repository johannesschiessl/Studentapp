![Student-App-Banner](/src/app/opengraph-image.png)

# Student-App

An app for students to track their grades, homework, subjects, events, and exams.

## Self-Hosting

This guide will help you set up and run the Student App locally using Next.js and Supabase.

**Note:** As of 2024-10-04, the app is not production-ready and only runs on a development server.

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

5. **Run the Development Server**

   Start the Next.js development server:

   ```sh
   npm run dev
   ```

   Or if you're using Yarn:

   ```sh
   yarn dev
   ```

   The application should now be running on [http://localhost:3000](http://localhost:3000).

6. **Accessing the App**

   Visit `http://localhost:3000` in your browser to start using the Student App. You should be able to log in and start tracking your data once your Supabase backend is correctly set up.

### Troubleshooting

- Make sure all environment variables are set correctly in the `.env` file.
- Ensure your Supabase tables and policies match the required setup.
- Check the console for any error messages and address them accordingly.

## Contributing

Feel free to contribute by opening issues. Any help to improve the app is greatly appreciated!

## License

This project is licensed under the MIT License. See the [LICENSE](/LICENSE) file for more information.
