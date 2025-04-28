from models import create_product
import datetime

def generate_test_products():
    products = [
        create_product(
            name="Classic White Shirt",
            description="A timeless white button-up shirt suitable for any formal occasion.",
            price=49.99,
            image_url="https://example.com/white-shirt.jpg",
            categories=["clothing", "formal", "shirts"],
            attributes={"color": "white", "material": "cotton", "gender": "unisex"}
        ),
        create_product(
            name="Navy Blue Blazer",
            description="A sophisticated navy blazer that adds polish to any outfit.",
            price=129.99,
            image_url="https://example.com/navy-blazer.jpg",
            categories=["clothing", "formal", "outerwear"],
            attributes={"color": "navy", "material": "wool", "gender": "unisex"}
        ),
        create_product(
            name="Black Slim-Fit Jeans",
            description="Modern slim-fit jeans in classic black.",
            price=59.99,
            image_url="https://example.com/black-jeans.jpg",
            categories=["clothing", "casual", "jeans"],
            attributes={"color": "black", "material": "denim", "gender": "unisex"}
        ),
        create_product(
            name="Beige Chino Pants",
            description="Versatile chino pants perfect for casual and business-casual settings.",
            price=45.99,
            image_url="https://example.com/beige-chinos.jpg",
            categories=["clothing", "casual", "pants"],
            attributes={"color": "beige", "material": "cotton", "gender": "unisex"}
        ),
        create_product(
            name="Gray Cashmere Sweater",
            description="Luxurious cashmere sweater for unmatched comfort and warmth.",
            price=149.99,
            image_url="https://example.com/gray-sweater.jpg",
            categories=["clothing", "casual", "knitwear"],
            attributes={"color": "gray", "material": "cashmere", "gender": "unisex"}
        ),
        create_product(
            name="Brown Leather Belt",
            description="Classic brown leather belt with a timeless buckle design.",
            price=35.99,
            image_url="https://example.com/brown-belt.jpg",
            categories=["accessories", "belts"],
            attributes={"color": "brown", "material": "leather", "gender": "unisex"}
        ),
        create_product(
            name="Minimalist Watch",
            description="Sleek minimalist watch with a black leather strap.",
            price=89.99,
            image_url="https://example.com/minimalist-watch.jpg",
            categories=["accessories", "watches"],
            attributes={"color": "black", "material": "leather", "gender": "unisex"}
        ),
        create_product(
            name="Canvas Tote Bag",
            description="Sturdy canvas tote for everyday use.",
            price=29.99,
            image_url="https://example.com/tote-bag.jpg",
            categories=["accessories", "bags"],
            attributes={"color": "natural", "material": "canvas", "gender": "unisex"}
        ),
        create_product(
            name="White Sneakers",
            description="Clean, minimal white sneakers that go with everything.",
            price=79.99,
            image_url="https://example.com/white-sneakers.jpg",
            categories=["footwear", "casual", "sneakers"],
            attributes={"color": "white", "material": "leather", "gender": "unisex"}
        ),
        create_product(
            name="Black Chelsea Boots",
            description="Classic Chelsea boots that transition seamlessly from day to night.",
            price=129.99,
            image_url="https://example.com/chelsea-boots.jpg",
            categories=["footwear", "formal", "boots"],
            attributes={"color": "black", "material": "leather", "gender": "unisex"}
        ),
        create_product(
            name="Wool Scarf",
            description="Soft wool scarf to add warmth and style to any outfit.",
            price=39.99,
            image_url="https://example.com/wool-scarf.jpg",
            categories=["accessories", "scarves"],
            attributes={"color": "gray", "material": "wool", "gender": "unisex"}
        ),
        create_product(
            name="Leather Messenger Bag",
            description="Professional leather messenger bag with multiple compartments.",
            price=149.99,
            image_url="https://example.com/messenger-bag.jpg",
            categories=["accessories", "bags", "formal"],
            attributes={"color": "brown", "material": "leather", "gender": "unisex"}
        )
    ]
    return products