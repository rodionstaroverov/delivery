<template>
  <div id="app">
    <div id="user-name" v-if="!user.status">
      <p>Пожалуйста введите ваше имя</p>
      <input v-model="user.name" v-on:keyup.13="user.status = true" autofocus maxlength="30">
      <div class="user-name-submit" v-if="user.name && !user.status" v-on:click="user.status = true">OK</div>

      <!--<pre style="font-size: 12px;">{{ $data | json }}</pre>-->
    </div>

    <header v-if="user.status">
      <div class="logo"></div>
      <div class="current-user">Вы зашли как: {{ user.name }}</div>
      <div class="total-order"><a href="#">Посмореть общий заказ</a></div>
    </header>

    <div class="main-content">
      <div v-for="product in items" v-bind:id="product.id" class="product" v-bind:style="{ 'background-image': 'url(' + product.img + ')'}" v-on:click="toggleActive(product)">
        <div class="product-success" @click="$event.target.classList.toggle('product-success-active')"></div>
        <div class="product-description">
          <h4>{{ product.name }}</h4>
          <!--<p class="description">{{ product.description }}</p>-->
        </div>
        <div class="product-price">{{ product.price | currency}}</div>
      </div>
      <div class="total-order">
        <p>Общая сумма заказа: {{  total() | currency }}</p>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: 'app',
  methods: {
      toggleActive: function(s){
          s.active = !s.active;
      },
      total: function(){

          var total = 0;

          this.items.forEach(function(s){
              if (s.active){
                  total+= s.price;
              }
          });
          return total;
      }
  },
  data () {
    return {
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
                active: false
            },
            {
                name: "Второе блюдо",
                price: 110,
                id: "q11",
                img: "/src/assets/item-2.jpg",
                active: false
            },
            {
                name: "Салат",
                price: 65,
                id: "q12",
                img: "/src/assets/item-3.jpg",
                active: false
            },
            {
                name: "Бутерброд",
                price: 70,
                id: "q13",
                img: "/src/assets/item-4.jpg",
                active: false
            },
            {
                name: "Лимонад",
                price: 50,
                id: "q14",
                img: "/src/assets/item-5.jpg",
                active: false
            },
            {
                name: "Чай",
                price: 20,
                id: "q15",
                img: "/src/assets/item-6.jpg",
                active: false
            },
            {
                name: "Десерт",
                price: 75,
                id: "q16",
                img: "/src/assets/item-7.jpg",
                active: false
            },
            {
                name: "Хлеб",
                price: 5,
                id: "q17",
                img: "/src/assets/item-8.jpg",
                active: false
            },
            {
                name: "Приборы",
                price: 10,
                id: "q18",
                img: "/src/assets/item-9.jpg",
                active: false
            }
        ]
    }
  }
}
</script>

<style lang="scss">
  body {
    background-color: #fffafa;
    margin: 0;
    padding: 0;
  }

  * {
    font-family: 'Open Sans Condensed', sans-serif;

  }

  #user-name {
    width: 100%;
    height: 100%;
    display: block;
    position: absolute;
    z-index: 100;
    background-color: #fffafa;
    font-size: 28px;
    input {
      height: 40px;
      width: 99vw;
      text-align: center;
      font-size: 28px;
      background-color: #fffafa;
      border: none;
      margin-left: 7px;
    }
    p {
      margin-top: 33vh;
      text-align: center;
      color: #666666;
    }
    input:focus {
      outline: none;
    }
  }

  .user-name-submit {
    background-color: #75e0d3;
    width: 120px;
    height: 40px;
    display: block;
    margin: 30px auto;
    color: #fffafa;
    font-size: 20px;
    text-align: center;
    line-height: 1.9;
    cursor: pointer;
    &:hover {
      background-color: #1db590;
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
      width: 250px;
      height: 80px;
      background: url(assets/logo.svg) no-repeat;
    }
    .current-user {
      font-size: 20px;
      line-height: 4.7;
    }
    .total-order {
      width: 250px;
      height: 50px;
      font-size: 20px;
      line-height: 4.7;
      a {
        color: #000;
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
    .product {
      height: 220px;
      margin: 5px;
      width: 380px;
      display: block;
      float: left;
      cursor: pointer;
      background: rgba(0, 0, 0, .8);
      background-position: center center;
      background-size: 100%;
      h4 {
        margin-top: 30px;
      }
      .product-success {
        background-color: #1db590;
        opacity: .3;
        position: relative;
        width: 100%;
        height: 100%;
        margin-bottom: -220px;
        visibility: hidden;
      }
      .product-success-active {
        visibility: visible;
      }
      &:hover {
        h4, div {
          opacity: 1;
          visibility: visible;
          color: #333;
        }
        .product-success {
          opacity: .3;
        }
        .product-success-active {
          transition: background-color .3s;
          opacity: .3;
          background-color: #b53356;
        }
      }
      h4 {
        text-align: center;
      }
      .product-description {
        color: #333;
        background: #fffafa;
        width: 140px;
        font-size: 24px;
      }
      .product-price {
        text-align: center;
        color: #333;
        width: 50px;
        font-size: 18px;
        background: #fffafa;
      }
    }
    .total-order {
      float: right;
      margin-right: 5px;
      font-size: 26px;
    }
  }
</style>
