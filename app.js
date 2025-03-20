const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    let response = categoryProductsQA();
    res.send(response);
});


function categoryProductsQA() {
    const products = [
        {
            "id": 1,
            "title": "Leite Integral Piracanjuba 1L",
            "supermarket": "Supermercado A",
        },
        {
            "id": 2,
            "title": "Leite Piracanjuba Integral 1L",
            "supermarket": "Supermercado B",
        },
        {
            "id": 3,
            "title": "Leite Integral Italac 1L",
            "supermarket": "Supermercado A",
        },
        {
            "id": 4,
            "title": "Leite Italac Integral 1L",
            "supermarket": "Supermercado C",
        },
        {
            "id": 5,
            "title": "Leite Parmalat Integral 1L",
            "supermarket": "Supermercado D",
        },
        {
            "id": 6,
            "title": "Leite Desnatado Piracanjuba 1L",
            "supermarket": "Supermercado A",
        },
        {
            "id": 7,
            "title": "Piracanjuba Leite Desnatado 1L",
            "supermarket": "Supermercado B",
        },
        {
            "id": 8,
            "title": "Leite Semi-Desnatado Piracanjuba 1L",
            "supermarket": "Supermercado A",
        },
        {
            "id": 9,
            "title": "Leite Piracanjuba Semi Desnatado 1 Litro",
            "supermarket": "Supermercado C",
        },
        {
            "id": 10,
            "title": "Arroz Branco Tio João 5kg",
            "supermarket": "Supermercado A",
        },
        {
            "id": 11,
            "title": "Arroz Tio João Branco 5kg",
            "supermarket": "Supermercado B",
        },
        {
            "id": 12,
            "title": "Arroz Tio João Integral 5kg",
            "supermarket": "Supermercado A",
        },
        {
            "id": 13,
            "title": "Feijão Carioca Camil 1kg",
            "supermarket": "Supermercado A",
        },
        {
            "id": 14,
            "title": "Feijão Camil Tipo Carioca 1kg",
            "supermarket": "Supermercado C",
        },
        {
            "id": 15,
            "title": "Feijao Carioca Camil 1 Quilo",
            "supermarket": "Supermercado D",
        }
    ];

    const normalizarTexto = (title) => {
        const palavrasRemover = title.toLowerCase().includes("arroz")
            ? ["Tipo", "Integral", "Branco"]
            : ["Tipo"];

        let value = title
            .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
            .split(/\d/)[0].trim()
            .replace(/-/g, " ")
            .replace(new RegExp(`\\b(${palavrasRemover.join("|")})\\b`, "gi"), "")
            .replace(/\s+/g, " ")
            .toLowerCase();

        return value.split(" ").sort().join("");
    };

    const groupedProducts = new Map();

    products.forEach(product => {
        const normalizedTitle = normalizarTexto(product.title);

        console.log(normalizedTitle)

        let category = [...groupedProducts.keys()].find(cat => normalizarTexto(cat) === normalizedTitle);

        if (!category) {
            category = product.title;
            groupedProducts.set(category, { category, count: 0, products: [] });
        }

        groupedProducts.get(category).products.push({
            title: product.title,
            supermarket: product.supermarket
        });

        groupedProducts.get(category).count++;
    });

    const result = Array.from(groupedProducts.values());

    console.log(JSON.stringify(result, null, 2));

    return result;
}

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
