<template>
  <form @submit.prevent="submitHandler">
    <h1>Регистрация клиента</h1>
    <div class="input-group" v-show="counter === 0">
      <h2>Заполните данные</h2>
      <div class="input-field">
        <small class="helper-text" v-if="$v.obj1.surname.$dirty && !$v.obj1.surname.required">Поле не должно быть пустым</small>
        <input
          id="surname"
          type="text"
          v-model.trim="obj1.surname"
          class="input"
          :class="{'invalid': $v.obj1.surname.$dirty && !$v.obj1.surname.required}"
        >
        <label for="surname">Фамилия{{$v.obj1.surname ? '*' : ''}}:</label>
      </div>
      <div class="input-field">
        <small class="helper-text" v-if="$v.obj1.name.$dirty && !$v.obj1.name.required">Поле не должно быть пустым</small>
        <input
          id="name"
          type="text"
          v-model.trim="obj1.name"
          class="input"
          :class="{'invalid': $v.obj1.name.$dirty && !$v.obj1.name.required}"
        >
        <label for="name">Имя{{$v.obj1.name ? '*' : ''}}:</label>
      </div>
      <div class="input-field">
        <input
          id="patronymic"
          type="text"
          v-model.trim="obj1.patronymic"
          class="input"
        >
        <label for="patronymic">Отчество:</label>
      </div>
      <div class="input-field">
        <small class="helper-text" v-if="$v.obj1.dob.$dirty && !$v.obj1.dob.required">Поле не должно быть пустым</small>
        <input
          id="dob"
          type="date"
          v-model="obj1.dob"
          class="input"
          :class="{'invalid': $v.obj1.dob.$dirty && !$v.obj1.dob.required}"
        >
        <label for="dob">Дата рождения{{$v.obj1.dob ? '*' : ''}}:</label>
      </div>
      <div class="input-field">
        <small class="helper-text" v-if="$v.obj1.phone.$dirty && !$v.obj1.phone.required">Поле не должно быть пустым</small>
        <small class="helper-text invalid" v-else-if="$v.obj1.phone.$dirty && !$v.obj1.phone.minLength">Длина номера {{obj1.phone.length || '1'}} из {{$v.obj1.phone.$params.minLength.min}}</small>
        <input
          id="phone"
          type="tel"
          v-model.trim="obj1.phone"
          class="input"
          :class="{'invalid': ($v.obj1.phone.$dirty && !$v.obj1.phone.required) || ($v.obj1.phone.$dirty && !$v.obj1.phone.minLength)}"
        >
        <label for="phone">Телефон{{$v.obj1.phone ? '*' : ''}}:</label>
      </div>
      <div class="input-field">
        <input
          id="gender"
          type="text"
          v-model.trim="obj1.gender"
          class="input"
        >
        <label for="gender">Пол:</label>
      </div>
      <div class="input-field">
        <small class="helper-text" v-if="$v.obj1.group.$dirty && ($v.obj1.group.$model[0] === '')">Поле не должно быть пустым</small>
        <select 
          v-model="obj1.group" 
          id="group" 
          multiple size="3"
          class="select"
          :class="{'invalid': $v.obj1.group.$dirty && ($v.obj1.group.$model[0] === '')}"
        >
          <option>VIP</option>
          <option>Проблемные</option>
          <option>ОМС</option>
        </select>
        <label for="group">Группа клиентов{{$v.obj1.group ? '*' : ''}}:</label>
      </div>
      <div class="input-field">
        <select v-model="obj1.doctor" id="doctor" class="select">
          <option>Иванов</option>
          <option>Захаров</option>
          <option>Чернышева</option>
        </select>
        <label for="doctor">Лечащий врач:</label>
      </div>
      <div class="input-field input-field--checkbox">
        <input v-model="obj1.withoutSms" type="checkbox" id="sms">
        <label for="sms">Не отправлять СМС</label>
      </div>
    </div>
    <div class="input-group" v-show="counter === 1">
      <h2>Адрес</h2>
      <div class="input-field">
        <input
          id="index"
          type="text"
          v-model.trim="obj2.index"
          class="input"
        >
        <label for="index">Индекс:</label>
      </div>
      <div class="input-field">
        <input
          id="country"
          type="text"
          v-model.trim="obj2.country"
          class="input"
        >
        <label for="country">Страна:</label>
      </div>
      <div class="input-field">
        <input
          id="region"
          type="text"
          v-model.trim="obj2.region"
          class="input"
        >
        <label for="region">Область:</label>
      </div>
      <div class="input-field">
        <small class="helper-text" v-if="$v.obj2.city.$dirty && !$v.obj2.city.required">Поле не должно быть пустым</small>
        <input
          id="city"
          type="text"
          v-model.trim="obj2.city"
          class="input"
          :class="{'invalid': $v.obj2.city.$dirty && !$v.obj2.city.required}"
        >
        <label for="city">Город{{$v.obj2.city ? '*' : ''}}:</label>
      </div>
      <div class="input-field">
        <input
          id="street"
          type="text"
          v-model.trim="obj2.street"
          class="input"
        >
        <label for="street">Улица:</label>
      </div>
      <div class="input-field">
        <input
          id="house"
          type="text"
          v-model.trim="obj2.house"
          class="input"
        >
        <label for="house">Дом:</label>
      </div>
    </div>
    <div class="input-group" v-show="counter === 2">
      <h2>Паспорт</h2>
      <div class="input-field">
        <small class="helper-text" v-if="$v.obj3.docType.$dirty && !$v.obj3.docType.required">Поле не должно быть пустым</small>
        <select 
          v-model="obj3.docType" 
          id="docType"
          class="select"
          :class="{'invalid': $v.obj3.docType.$dirty && !$v.obj3.docType.required}"
        >
          <option>Паспорт</option>
          <option>Свидетельство о рождении</option>
          <option>Вод. удостоверение</option>
        </select>
        <label for="docType">Тип документа{{$v.obj3.docType ? '*' : ''}}:</label>
      </div>
      <div class="input-field">
        <input
          id="series"
          type="text"
          v-model.trim="obj3.series"
          class="input"
        >
        <label for="series">Серия:</label>
      </div>
      <div class="input-field">
        <input
          id="number"
          type="text"
          v-model.trim="obj3.number"
          class="input"
        >
        <label for="number">Номер:</label>
      </div>
      <div class="input-field">
        <input
          id="issued"
          type="text"
          v-model.trim="obj3.issued"
          class="input"
        >
        <label for="issued">Кем выдан:</label>
      </div>
      <div class="input-field">
        <small class="helper-text" v-if="$v.obj3.doi.$dirty && !$v.obj3.doi.required">Поле не должно быть пустым</small>
        <input
          id="doi"
          type="text"
          v-model.trim="obj3.doi"
          class="input"
          :class="{'invalid': $v.obj3.doi.$dirty && !$v.obj3.doi.required}"
        >
        <label for="doi">Дата выдачи{{$v.obj3.doi ? '*' : ''}}:</label>
      </div>
    </div>
    <div class="button-group">
      <button type="button" v-if="counter > 0" @click="counter--">предыдущая</button>
      <button type="button" v-if="counter === 0 || counter !== 2" @click="counter++">следующая</button>
    </div>
    <button type="submit">отправить</button>
  </form>
</template>

<script>
import {required, minLength} from 'vuelidate/lib/validators'

export default {
  name: 'create-client',
  data: () => ({
    counter: 0,
    obj1: {
      surname: '',
      name: '',
      patronymic: '',
      dob: '',
      phone: 7,
      gender: '',
      group: [''],
      doctor: '',
      withoutSms: true
    },
    obj2: {
      index: '',
      country: '',
      region: '',
      city: '',
      street: '',
      house: ''
    },
    obj3: {
      docType: '',
      series: '',
      number: '',
      issued: '',
      doi: ''
    }
  }),
  validations: {
    obj1: {
      surname: {required},
      name: {required},
      dob: {required},
      phone: {required, minLength: minLength(11)},
      group: {required}
    },
    obj2: {
      city: {required}
    },
    obj3: {
      docType: {required},
      doi: {required}
    }
  },
  methods: {
    async submitHandler () {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }

      const formData = {
        ...this.obj1,
        group: this.obj1.group[0],
        ...this.obj2,
        ...this.obj3,
      }

      console.log(formData)
    }
  }
}
</script>

<style lang="sass">
form
    width: 80%
    margin: 0 auto
    background: #fff
    color: #08acad
    padding: 2rem
    box-shadow: 0 0 20px #6a6a6a
    border-radius: 15px
h1 
    text-align: center
    margin: 0
    padding-top: 1rem
    padding-bottom: 2rem



.input-group
    display: flex
    flex-direction: column
    justify-content: space-between
    margin: 0 2rem
    

.input-field
    margin-bottom: 1rem
    display: flex
    flex-direction: column-reverse
    font-size: 24px

    label
        color: #6a6a6a

    .input,
    .select
        font-size: 24px
        padding: 1rem
        margin-top: 5px
        outline: none
        background-color: #f5f5f5
        border: none
        border-bottom: 1px solid #08acad 

    .invalid
        border-color: #d73c42

    .helper-text
        font-size: 16px
        color: #d73c42

.input-field--checkbox
    display: block

    input
        width: 18px
        height: 18px
        margin-right: 1rem
    
    label
        color: #6a6a6a

button[type="button"]
    border: none
    background: none
    outline: none
    color: #6a6a6a
    cursor: pointer

</style>