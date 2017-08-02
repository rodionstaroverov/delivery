<template>
  <div id="app">
    <div id="user-name" v-if="!user.status"> <!--here-->
      <p>Пожалуйста введите ваше имя</p>
      <input v-model="user.name" v-on:keyup.13="user.status = true" autofocus maxlength="30">
      <div class="user-name-submit" v-if="user.name && !user.status" v-on:click="user.status = true">OK</div>
      <!--<pre style="font-size: 12px;">{{ $data | json }}</pre>-->
    </div>

    <header v-if="user.status">
      <div class="logo"></div>
      <div class="current-user">Вы зашли как: {{ user.name }}</div>
      <div id="orders">
        <a href="#">Посмореть общий заказ </a>
      </div>
    </header>

    <div class="main-content" v-if="!order && user.status"> <!--here-->
      <div v-for="product in items" v-bind:id="product.id" class="product" v-bind:class="{ 'product-active': product.active }">
          <img v-bind:src="product.img" class="product-image" />
        <div class="product-description">
          <h4>{{ product.name }}</h4>
        </div>
        <div class="product-price">{{ product.price | currency }}</div>
          <div class="success-btn" v-on:click="increaseProductQty(product)">Заказать</div>
      </div>
      <div class="total-order">
        <!--<pre style="font-size: 12px;">{{ $data | json }}</pre>-->

          <div class="submit decline" @click="removeActive({ items })">Отменить</div>
          <span>Общая сумма заказа: {{  total() | currency }}</span>
          <div class="submit" @click="order = !order">Далее</div>
      </div>

    </div>

    <div class="order-table" v-if="order">
      <p>Подтвердите заказ</p>
      <ul>
          <li><div>Название</div><div>Количество</div><div>Стоимость</div></li>
        <li v-if="a.active" v-for="a in items"><div>{{ a.name }}</div><div>{{ a.count }} шт.</div><div>{{ (a.price * a.count) | currency }}</div></li>
        <hr>
        <li><div>Общая сумма: </div><div>{{ totalQty() }} шт.</div><div>{{ total() | currency }}</div></li>
          <div class="order-btn">
            <div class="submit" @click="order = !order" v-if="order">Вернутсья</div>
            <div class="submit" @click="" v-if="order">Все верно</div>
          </div>
      </ul>
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
      total: function() {
          var total = 0;
          var totalQty = 0;
          this.items.forEach(function(s) {
              if (s.active) {
                  total += s.price * s.count;
              }
          });
          return total;
      },
      totalQty: function() {
          var totalQty = 0;
          this.items.forEach(function(s){
              if (s.active) {
                  totalQty +=  s.count;
              }
          });
          return totalQty;
      }
  },
  data () {
    return {
        order: false,
        user:
            {
                name: "",
                status: false
            },
        items: [
            {
                name: "Первое блюдо",
                price: 130,
                id: "q10",
                img: "/src/assets/item-1.jpg",
                active: false,
                count: 0
            },
            {
                name: "Второе блюдо",
                price: 110,
                id: "q11",
                img: "/src/assets/item-2.jpg",
                active: false,
                count: 0
            },
            {
                name: "Салат",
                price: 65,
                id: "q12",
                img: "/src/assets/item-3.jpg",
                active: false,
                count: 0
            },
            {
                name: "Бутерброд",
                price: 70,
                id: "q13",
                img: "/src/assets/item-4.jpg",
                active: false,
                count: 0
            },
            {
                name: "Лимонад",
                price: 50,
                id: "q14",
                img: "/src/assets/item-5.jpg",
                active: false,
                count: 0
            },
            {
                name: "Чай",
                price: 20,
                id: "q15",
                img: "/src/assets/item-6.jpg",
                active: false,
                count: 0
            },
            {
                name: "Десерт",
                price: 75,
                id: "q16",
                img: "/src/assets/item-7.jpg",
                active: false,
                count: 0
            },
            {
                name: "Хлеб",
                price: 5,
                id: "q17",
                img: "/src/assets/item-8.jpg",
                active: false,
                count: 0
            },
            {
                name: "Приборы",
                price: 10,
                id: "q18",
                img: "/src/assets/item-9.jpg",
                active: false,
                count: 0
            },
            {
                name: "Другое",
                price: 1337,
                id: "q19",
                img: "/src/assets/item-9.jpg",
                active: false,
                count: 0
            }
        ]
    }
  }
}
</script>

<style lang="scss">
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

  #user-name {
    width: 100%;
    height: 100%;
    display: block;
    position: absolute;
    z-index: 100;
    background-color: $main-color;
    font-size: 28px;
      color: $color-white;
    input {
      height: 40px;
      width: 99vw;
      text-align: center;
      font-size: 28px;
      background-color: $main-color;
      border: none;
      margin-left: 7px;
        color: $color-white;
    }
    p {
      margin-top: 33vh;
      text-align: center;
    }
    input:focus {
      outline: none;
    }
  }

  .user-name-submit {
    background-color: $color-green;
    width: 120px;
    height: 40px;
    display: block;
    margin: 30px auto;
    color: $color-white;
    font-size: 20px;
    text-align: center;
    line-height: 1.9;
    cursor: pointer;
    &:hover {
      background-color: darken($color-green, 10%);
    }
  }

  header {
    width: 1170px;
    height: 100px;
    display: flex;
    margin: 30px auto;
    justify-content: space-between;
    /*background-color: #75e0d3;*/
    .logo {
      margin: 10px 0 0 10px;
      width: 160px;
      height: 80px;
      background: url(assets/logo.svg) no-repeat;
    }
    .current-user {
      font-size: 20px;
      line-height: 4.7;
    }
    #orders {
      margin-right: 7px;
      height: 50px;
      font-size: 20px;
      line-height: 4.7;
      a {
        color: $color-white;
        text-decoration: none;
        &:hover {
          text-decoration: underline;
        }
      }
    }
  }

  .main-content {
    width: 1170px;
    margin: 0 auto;
      .product-active {
          box-shadow: 0 0 15px $color-green;
      }
    .product {
        height: 400px;
        width: 224px;
        margin: 5px;
        display: block;
        float: left;
        background: $main-color;
        border: 1px solid $main-color-dark;
        border-bottom: 1px solid $color-white;
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
                .product {
                    transform: rotate(90deg);
                }
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
      margin: 30px 5px;
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
        margin: 5px 10px 0 0;
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
  .order-table {
    width: 1170px;
    margin: 0 auto;
    font-size: 22px;
      li {
          display: flex;
          justify-content: space-between;
          div {
              width: 33%;
              text-align: right;
              &:nth-child(1) {
                  text-align: left;
              }
          }
      }
      .order-btn {
          display: flex;
          justify-content: space-between;
          .submit {
              width: 150px;
              height: 40px;
              display: flex;
              justify-content: center;
              background-color: $color-green;
              color: $color-white;
              cursor: pointer;
              line-height: 1.7;
              user-select: none;
              margin-top: 30px;
              &:hover {
                  background-color: darken($color-green, 10%);
              }
          }
      }

    p {
      text-align: center;
      margin-bottom: 50px;
    }
    ul {
      margin: 0 auto;
      width: 480px;
      li {
        list-style: none;
        display: flex;
        justify-content: space-between;
        width: 480px;
      }
    }

  }
</style>
