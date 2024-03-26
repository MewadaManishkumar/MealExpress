const { dbusername, password } = process.env;

export const connectionStr = `mongodb+srv://${dbusername}:${password}@mealexpresscluster.ldhn20j.mongodb.net/mealexpressDB?retryWrites=true&w=majority&appName=MealexpressCluster`;
