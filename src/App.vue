<template>
    <div id="app">
        <div class="user-name" v-if="!user.status">
            <!--<p>Пожалуйста введите ваш логин и пароль</p>-->
            <div class="user-data">
                <span>Логин:</span>
                <input v-model="user.login" maxlength="30">
            </div>

            <div class="user-data">
                <span>Пароль:</span>
                <input type="password" v-model="user.password" maxlength="30">
            </div>
            <div class="user-confirm" v-if="user.login.length >= 4 && user.password.length >= 6 && !user.status">
                <div class="user-name-submit" v-on:click="(user.status = true) && auth()">OK</div>
                <div class="user-name-submit btn-blue">Общий заказ</div>
            </div>
        </div>
        <pre style="font-size: 16px; position: absolute; top: 10px; left: 10px; z-index: 1000;">
        {{ $data.user | json }}
        <hr>
            <!--{{ $data.usersOrder | json }}-->
        </pre>

        <header v-if="user.status && authStatus">
            <div class="header-items">
                <div class="logo"></div>
                <div class="current-user">Вы зашли как: {{ user.name }}</div>
                <div class="orders">
                    <div>Общий заказ </div>
                </div>
            </div>
        </header>

        <div class="main-content" v-if="user.status && authStatus">

            <div class="product-list">

                <span>Категории</span>
                <ul>
                    <li v-bind:class="{ 'list-active': !activeCategory }"
                        @click="activeCategory = false; activeList(category)">Все товары
                    </li>
                    <li v-for="category in categories" v-bind:class="{ 'list-active': category.active }"
                        @click="activeList(category); activeCategory = category.name">{{ category.name }}
                    </li>
                </ul>
            </div>

            <div class="product-items">
                <div class="product-category">
                    <div v-for="category in categories" v-if="category.active && activeCategory">{{ category.name }}
                    </div>
                    <div v-show="!activeCategory">Все товары</div>
                </div>

                <!-- all -->
                <div v-for="product in items" v-if="!activeCategory" v-bind:id="product.id" class="product"
                     v-bind:class="{ 'product-active': product.active }">
                    <img v-bind:src="product.img" class="product-image"/>
                    <div class="product-description">
                        <h4>{{ product.name }}</h4>
                    </div>
                    <div class="product-price">{{ product.price | currency }}</div>
                    <div class="success-btn" v-on:click="order = true; increaseProductQty(product)">Заказать</div>
                </div>

                <!-- sorted -->
                <div v-for.stop="product in items" v-else-if="activeCategory == product.category" v-bind:id="product.id"
                     class="product" v-bind:class="{ 'product-active': product.active }">
                    <img v-bind:src="product.img" class="product-image"/>
                    <div class="product-description">
                        <h4>{{ product.name }}</h4>
                    </div>
                    <div class="product-price">{{ product.price | currency }}</div>
                    <div class="success-btn" v-on:click="order = true; increaseProductQty(product)">Заказать</div>
                </div>
            </div>

            <div class="checkout">
                <span>Миникорзина</span>
                <div class="order-table" v-if="order">
                    <ul>
                        <li v-if="a.active" v-for="a in items">
                            <div>{{ a.name }}</div>
                            <div>X {{ a.count }}</div>
                            <div>{{ (a.price * a.count) | currency }}</div>
                        </li>
                        <hr/>
                        <li>
                            <div>Общая сумма: </div>
                            <div>X {{ totalQty() }}</div>
                            <div>{{ total() | currency }}</div>
                        </li>
                        <div class="order-btn">
                            <div class="submit" @click="removeActive({ items }); order = false;">Сбросить</div>
                            <div class="submit" @click="confirmOrder()">Все верно</div>
                        </div>
                    </ul>
                </div>
                <span v-if="!order">Ваша корзина пуста</span>
            </div>

        </div>

        <div v-if="user.status && !authStatus" class="auth-error">
            Вы сегодня уже сделали заказ, приходите завтра :)
        </div>


    </div>
</template>

<script>
    export default {
        name: 'app',
        methods: {
            increaseProductQty: function (s) {
                s.active = true;
                s.count += 1;
            },
            removeActive: function (s) {
                for (var i = 0; i < s.items.length; i++) {
                    s.items[i].active = false;
                    s.items[i].count = 0;
                }
            },
            total: function () {
                var total = 0;
                var totalQty = 0;
                this.items.forEach(function (s) {
                    if (s.active) {
                        total += s.price * s.count;
                    }
                });
                return total;
            },
            totalQty: function () {
                var totalQty = 0;
                this.items.forEach(function (s) {
                    if (s.active) {
                        totalQty += s.count;
                    }
                });
                return totalQty;
            },
            activeList: function (s) {
                this.categories.forEach(function (s) {
                    if (s.active) {
                        s.active = false;
                    }
                });
                s.active = true;
            },
            confirmOrder: function () {
                this.usersOrder.push({
                    username: this.user.name,
                    totalPrice: this.total(),
                    totalQty: this.totalQty(),
                    order: true
                });
                this.user.order = true;
            },
            auth: function () {
                var activeOrders = [];
                this.usersOrder.forEach(function (s) {
                    if (!s.order) {
                        activeOrders.push(s.username);
                    }
                });
                var x = 0;
                for (var i = 0; i < activeOrders.length; i++) {
                    if (activeOrders[i] == this.user.login) {
                        x = x + 1;
                    }

                    function checkX() {
                        if (x > 0) {
                            return 0;
                        }
                        else {
                            return 1;
                        }
                    }

                    this.authStatus = checkX();
                }
            }
        },
        data() {
            return {
                authStatus: false,
                order: false,
                activeCategory: false,
                categories: [
                    {
                        name: "Первые блюда",
                        active: false
                    },
                    {
                        name: "Вторые блюда",
                        active: false
                    },
                    {
                        name: "Салаты",
                        active: false
                    },
                    {
                        name: "Бургеры",
                        active: false
                    },
                    {
                        name: "Десерты",
                        active: false
                    },
                    {
                        name: "Напитки",
                        active: false
                    }
                ],
                user:
                    {
                        name: "Родион",
                        login: "",
                        password: "",
                        status: false,
                        order: false
                    },
                usersOrder: [
                    {
                        username: "star",
                        totalPrice: 155,
                        totalQty: 4,
                        order: true
                    },
                    {
                        username: "star1",
                        totalPrice: 155,
                        totalQty: 4,
                        order: false
                    },
                    {
                        username: "name2",
                        totalPrice: 155,
                        totalQty: 4,
                        order: false
                    },
                    {
                        username: "name3",
                        totalPrice: 155,
                        totalQty: 4,
                        order: false
                    },

                ],
                items: [
                    {
                        name: "Первое блюдо",
                        price: 130,
                        id: "q10",
                        img: "/src/assets/item-1.jpg",
                        active: false,
                        count: 0,
                        category: "Бургеры"
                    },
                    {
                        name: "Второе блюдо",
                        price: 110,
                        id: "q11",
                        img: "/src/assets/item-2.jpg",
                        active: false,
                        count: 0,
                        category: "Бургеры"
                    },
                    {
                        name: "Салат",
                        price: 65,
                        id: "q12",
                        img: "/src/assets/item-3.jpg",
                        active: false,
                        count: 0,
                        category: "Салаты"
                    },
                    {
                        name: "Бутерброд",
                        price: 70,
                        id: "q13",
                        img: "/src/assets/item-4.jpg",
                        active: false,
                        count: 0,
                        category: "Салаты"
                    },
                    {
                        name: "Роллы",
                        price: 50,
                        id: "q14",
                        img: "/src/assets/item-5.jpg",
                        active: false,
                        count: 0,
                        category: "Салаты"
                    },
                    {
                        name: "Кофе",
                        price: 20,
                        id: "q15",
                        img: "/src/assets/item-6.jpg",
                        active: false,
                        count: 0,
                        category: "Салаты"
                    },
                    {
                        name: "Фреш",
                        price: 5,
                        id: "q17",
                        img: "/src/assets/item-8.jpg",
                        active: false,
                        count: 0,
                        category: "Салаты"
                    },
                    {
                        name: "Десерт",
                        price: 75,
                        id: "q16",
                        img: "/src/assets/item-7.jpg",
                        active: false,
                        count: 0,
                        category: "Салаты"
                    },
                    {
                        name: "Приборы",
                        price: 10,
                        id: "q18",
                        img: "/src/assets/item-7.jpg",
                        active: false,
                        count: 0,
                        category: "Салаты"
                    },
                    {
                        name: "Другое",
                        price: 1337,
                        id: "q19",
                        img: "/src/assets/item-7.jpg",
                        active: false,
                        count: 0,
                        category: "Салаты"
                    }
                ]
            }
        }
    }
</script>

<style lang="scss">
    $main-color-light: #465b6c;
    $main-color: #3E5262;
    $main-color-dark: #384A59;
    $color-white: #fff;
    $color-green: #1db590;
    $color-light-green: #75e0d3;
    $color-red: #d73d59;

    body {
        background-color: $main-color;
        margin: 0;
        padding: 0;
    }

    * {
        font-family: 'Open Sans Condensed', sans-serif;
        color: $color-white;
    }

    ::SELECTION {
        background-color: #333;
        color: $color-white;
    }

    .auth-error {
        width: 300px;
        display: block;
        margin: 40vh auto;
        font-size: 24px;
        text-align: center;
    }

    .user-name {
        width: 100%;
        height: 100%;
        display: block;
        //position: absolute;
        z-index: 100;
        background-color: $main-color;
        font-size: 22px;
        color: $color-white;
        margin-top: 33vh;
        .user-data {
            display: block;
            margin: 0 auto;
            width: 300px;
            font-size: 18px;
        }
        input {
            height: 40px;
            text-align: center;
            font-size: 22px;
            background-color: white;
            border: none;
            color: #333;
            width: 300px;
            margin: 20px auto;
            display: block;
        }
        p {
            margin-top: 33vh;
            text-align: center;
        }
        input:focus {
            outline: none;
        }
    }

    .user-confirm {
        width: 300px;
        display: flex;
        justify-content: space-between;
        margin: 0 auto;
        .user-name-submit {
            background-color: $color-green;
            width: 120px;
            height: 40px;
            display: block;
            color: $color-white;
            font-size: 20px;
            text-align: center;
            line-height: 1.9;
            cursor: pointer;
            &:hover {
                background-color: darken($color-green, 10%);
            }
        }
        .btn-blue {
            background-color: lighten($main-color-light, 10%);
            &:hover {
                background-color: $main-color-light;
            }
        }
    }

    header {
        width: 100%;
        height: 70px;
        position: fixed;
        background-color: $main-color;
        top: 0;
        z-index: 100;
        .header-items {
            width: 1170px;
            display: flex;
            margin: 0 auto;
            justify-content: space-between;
            height: 100%;
            border-bottom: 1px solid $color-white;
        }
        .logo {
            margin: 5px 0 0 5px;
            width: 160px;
            height: 50px;
            background: url(assets/logo.svg) no-repeat;
        }
        .current-user {
            font-size: 20px;
            line-height: 3.4;
        }
        .orders {
            margin-right: 7px;
            height: 50px;
            font-size: 20px;
            line-height: 3.4;
        }
    }

    .main-content {
        width: 1170px;
        margin: 80px auto;
        display: flex;
        justify-content: space-between;
        .product-list {
            width: 180px;
            display: block;
            user-select: none;
            margin-top: 1px;
            span {
                font-size: 20px;
                text-align: left;
                display: block;
                margin-bottom: 15px;
                margin-left: 12px;
            }
            li {
                list-style: none;
                font-size: 20px;
                margin-bottom: 3px;
                width: 150px;
                padding: 7px;
                display: block;
                cursor: pointer;
                margin-left: -35px;
                &:hover {
                    background-color: darken($main-color-dark, 10%);
                }
            }

            .list-active {
                background-color: darken($main-color-dark, 10%);
            }
        }
        .product-items {
            width: 677px;
            .product-category {
                font-size: 20px;
                text-align: center;
                display: block;
                margin-bottom: 8px;
                height: 32px;
            }

            .product {
                height: 400px;
                width: 219px;
                margin: 3px;
                display: block;
                float: left;
                background: $main-color;
                border: 1px solid $main-color-dark;
                box-sizing: border-box;
                user-select: none;
                &:hover {
                    color: #fff;
                }

                img {
                    width: 100%;
                    height: 165px;
                    display: block;
                }
                h4 {
                    margin-top: 30px;
                    height: 60px;
                    line-height: 2.5;
                    text-align: center;
                }
                .success-btn {
                    width: 90%;
                    margin: 40px auto;
                    height: 35px;
                    background-color: $color-green;
                    color: $color-white;
                    text-align: center;
                    line-height: 1.8;
                    font-size: 18px;
                    cursor: pointer;
                    &:hover {
                        background-color: darken($color-green, 10%);
                        color: $color-white;
                    }
                    &:active {
                        background-color: $color-green;
                    }
                }
                .product-description {
                    background: $main-color-dark;
                    font-size: 24px;
                }
                .product-price {
                    text-align: center;
                    color: $color-white;
                    font-size: 18px;
                    background: $main-color;
                }
            }
            .total-order {
                font-size: 26px;
                display: flex;
                justify-content: space-between;
                width: 100%;
                margin: 5px;
                padding-top: 5px;
                .disabled {
                    width: 224px;
                    height: 50px;
                    margin-right: 10px;
                }
                .submit {
                    width: 224px;
                    height: 50px;
                    display: flex;
                    justify-content: center;
                    background-color: $color-green;
                    color: $color-white;
                    cursor: pointer;
                    line-height: 1.8;
                    user-select: none;
                    &:hover {
                        background-color: darken($color-green, 10%);
                    }
                    &.decline {
                        background-color: $color-red;
                        &:hover {
                            background-color: darken($color-red, 10%);
                        }
                    }
                }
                span {
                    line-height: 2.1;
                }
            }
        }

        .checkout {
            width: 290px;
            display: block;
            span {
                font-size: 20px;
                text-align: center;
                display: block;
                margin-bottom: 15px;
                width: 290px;
                &:nth-child(2) {
                    margin-top: 20px;
                }
            }
        }

    }

    .order-table {
        width: 290px;
        margin: 0 auto;
        font-size: 18px;
        li {
            display: flex;
            justify-content: space-between;
            div {
                text-align: right;
                width: 40%;
                &:nth-child(1) {
                    text-align: left;
                    width: 40%;
                }
                &:nth-child(2) {
                    text-align: center;
                    width: 20%;
                }
            }
        }
        .order-btn {
            display: flex;
            justify-content: space-between;
            .submit {
                width: 110px;
                height: 40px;
                display: flex;
                justify-content: center;
                background-color: $color-green;
                color: $color-white;
                cursor: pointer;
                line-height: 2.1;
                user-select: none;
                margin-top: 30px;
                &:hover {
                    background-color: darken($color-green, 10%);
                }
                &:nth-child(1) {
                    background-color: $color-red;
                    &:hover {
                        background-color: darken($color-red, 10%);
                    }
                }
            }
        }

        p {
            text-align: center;
            margin-bottom: 50px;
        }
        ul {
            margin: 0 auto;
            width: 270px;
            margin-left: -30px;
            li {
                list-style: none;
                display: flex;
                justify-content: space-between;
                width: 270px;

            }
        }

    }
</style>
