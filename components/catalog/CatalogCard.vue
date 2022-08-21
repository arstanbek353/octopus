<template>
  <div class="card">
    <div class="card__inner">
      <picture class="card__pic">
        <img src="@/assets/images/image.jpg" alt="">
      </picture>
      <div class="card__info">
        <div class="card__type">{{ data.typeText }}</div>
        <div class="card__name">{{ data.name }}</div>
        <div class="card__geo"><img src="@/assets/icons/geo.svg" alt=""> {{ data.geo }}</div>
        <div class="card__seller"><span>Продавец</span>{{ data.salesman }}</div>
        <div class="card__view">
          <p>Вид товара</p>
          {{ data.product_type }}
        </div>
        <div class="card__description">{{ textCut(data.description, 227) }}</div>
      </div>
      <div class="card__order-info">
        <div class="card__price">{{ data.totalPrice.toLocaleString() }} ₽</div>
        <dl class="card__dl">
          <div class="card__dl-item">
            <dt class="card__dt">Количество</dt>
            <dd class="card__dd">{{ data.quantity.toLocaleString() }} шт.</dd>
          </div>
          <div class="card__dl-item">
            <dt class="card__dt">Стоимость за штуку</dt>
            <dd class="card__dd">{{ data.price.toLocaleString() }} ₽</dd>
          </div>
        </dl>
        <div class="card__action">
          <template v-if="is_deals">
            <BaseButton v-if="data.is_paid" class="card__add" disabled>Оплачено</BaseButton>
            <BaseButton v-else class="card__add button--success" @click.native="toPay">Оплатить</BaseButton>
          </template>
          <BaseButton 
            v-else class="card__add"
            @click.native="addToBusket"
          >Добавить в сделки</BaseButton>

          <FavouriteButton 
            :class="{'button--added': data.is_favourite}" 
            @click.native="toggleFavorite"
          ></FavouriteButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  props: {
    data: {
      type: Object | undefined,
      default() {
        return {
          type: null,
          typeText: null,
          name: null,
          geo: null,
          salesman: null,
          product_type: null,
          description: null,
          totalPrice: null,
          quantity: null,
          price: null,
          is_favourite: null
        }
      }
    },
    is_deals: {
      type: Boolean,
      default: false
    },
  },
  methods: {
    ...mapActions([
      'fetchToggleFavourite',
      'fetchToBusket',
      'fetchToPay',
    ]),
    async toggleFavorite() {
      const res = await this.fetchToggleFavourite({...this.data, is_favourite: !this.data.is_favourite})
    },
    async addToBusket() {
      const res = await this.fetchToBusket({item_id: this.data.id})
      alert(res.message)
    },
    async toPay() {
      const res = await this.fetchToPay(this.data.id)
    },
    textCut(text, length = 200) {
      if (text.length < length) return text;
      return text.slice(0, length) + '...'
    }
  }
}
</script>

<style lang="scss" scoped>
$height: 366px;
$width: 314px;
.card {
  &__inner {
    position: relative;
    display: flex;
    min-height: $height;
    padding: 20px;
    border: $border;
    border-radius: 10px;
    padding-right: $width;
  }
  &__pic {
    flex-shrink: 0;
    width: 256px;
    height: 256px;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  &__info {
    padding: 0 20px;
  }
  &__type {
    font-size: 13px;
    color: $def-light-color;
    margin-bottom: 17px;
  }
  &__name {
    font-size: 15px;
    font-weight: 500;
    margin-bottom: 30px;
  }
  &__geo {
    display: inline-flex;
    align-items: center;
    font-size: 13px;
    color: #616CA5;
    padding: 4px 8px;
    background-color: $second-color;
    border-radius: 5px;
    margin-bottom: 10px;
    img {
      flex-shrink: 0;
      width: 15px;
      height: 15px;
      object-fit: contain;
      margin-right: 4px;
    }
  }
  &__seller {
    font-size: 13px;
    margin-bottom: 13px;
    span {
      display: inline-block;
      color: $def-light-color;
    }
  }
  &__view {
    display: inline-flex;
    flex-direction: column;
    font-size: 13px;
    color: #616CA5;
    padding: 4px 8px;
    background-color: $second-color;
    margin-bottom: 15px;
    p {
      color: $def-light-color;
      margin-bottom: 4px;
    }
  }
  &__description {
    font-size: 13px;
    line-height: 1.5;
  }
  &__order-info {
    position: absolute;
    z-index: 2;
    right: 0;
    top: 0;
    display: flex;
    flex-direction: column;
    width: $width;
    height: 100%;
    min-height: $height;
    padding: 20px;
    border: $border;
    border-radius: 10px;
  }
  &__price {
    font-size: 20px;
    font-weight: 500;
    margin-bottom: 7px;
  }
  &__dl {
    margin-bottom: 20px;
  }
  &__dl-item {
    font-size: 13px;
    display: flex;
    justify-content: space-between;
    margin-bottom: 9px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  &__dt {
    color: $def-light-color;
  }
  &__action {
    margin-top: auto;
    display: flex;
    justify-content: space-between;
  }
  &__add {
    flex-grow: 1;
    margin-right: 10px;
  }
  @media (max-width: 62em) {
    &__inner {
      flex-direction: column;
    }
    &__pic {
      margin: 0 auto;
      margin-bottom: 20px;
    }
    &__info {
      padding: 0;
      padding-right: 20px;
    }
  }
  @media (max-width: 48em) {
    &__inner {
      padding-right: 20px;
    }
    &__pic {
      max-width: 256px;
      max-height: 256px;
      width: auto;
      height: auto;
      overflow: hidden;
      img {
        width: 100%;
        height: auto;
      }
    }
    &__info {
      margin-bottom: 20px;
      padding-right: 0;
    }
    &__order-info {
      position: static;
      width: 100%;
      height: auto;
      min-height: auto;
    }
  }
}
</style>