const prod = {
    url: {
        DB_URL: "https://backbro.se"
    }
};

const dev = {
    url: {
        DB_URL: "http://localhost:3002"
    }
};

export const config = process.env.NODE_ENV === "development" ? dev : prod;