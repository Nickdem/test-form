<template>
  <form @submit.prevent="submitHandler">
    <h1>Регистрация клиента</h1>
    <div class="input-group" v-show="counter === 0">

      <h2>Общие данные</h2>

      <div 
        v-for="person of personInputs" 
        :key="person.id" 
        class="input-field"
      >
        <small 
          class="helper-text" 
          v-if="(person.req && ($v.obj1[person.id].$dirty && !$v.obj1[person.id].required)) 
            || (person.minimumLength && ($v.obj1[person.id].$dirty && !$v.obj1[person.id].minLength))"
        >
          {{
            person.minimumLength && !$v.obj1[person.id].minLength 
            ? 'Длина номера ' + (obj1[person.id].length || '1') + ' из ' + $v.obj1[person.id].$params.minLength.min 
            : 'Поле не должно быть пустым'
          }}
        </small>
        <input
          :id="person.id"
          :type="person.type"
          v-model="obj1[person.id]"
          class="input"
          :class="{'invalid': (person.req && ($v.obj1[person.id].$dirty && !$v.obj1[person.id].required)) 
            || (person.minimumLength && ($v.obj1[person.id].$dirty && !$v.obj1[person.id].minLength))}"
        >
        <label 
          :for="person.id"
        >
          {{person.name}}{{person.req ? '*' : ''}}:
        </label>
      </div>
      

      <div v-for="sel of personSelectors" :key="sel.id" class="input-field">
        <small class="helper-text" v-if="sel.req && ($v.obj1[sel.id].$dirty && !$v.obj1[sel.id].required)">Поле не должно быть пустым</small>
        <select 
          v-model="obj1[sel.id]" 
          :id="sel.id" 
          :multiple="sel.multiple && 'multiple'"
          :size="sel.multiple && sel.options.length"
          class="select"
          :class="{'invalid': sel.req && ($v.obj1[sel.id].$dirty && !$v.obj1[sel.id].required)}"
        >
          <option v-for="opt of sel.options" :key="opt">{{opt}}</option>
        </select>
        <label for="group">{{sel.name}}{{sel.req ? '*' : ''}}:</label>
      </div>

      <div class="input-field input-field--checkbox">
        <input v-model="obj1.withoutSms" type="checkbox" id="sms">
        <label for="sms">Не отправлять СМС</label>
      </div>
    </div>

    <div class="input-group" v-show="counter === 1">

      <h2>Адрес</h2>
      
      <div 
        v-for="address of addressInputs" 
        :key="address.id" 
        class="input-field"
      >
        <small 
          class="helper-text" 
          v-if="address.req && ($v.obj2[address.id].$dirty && !$v.obj2[address.id].required)"
        >
          Поле не должно быть пустым
        </small>
        <input
          :id="address.id"
          type="text"
          v-model="obj2[address.id]"
          class="input"
          :class="{'invalid': address.req && $v.obj2[address.id].$dirty && !$v.obj2[address.id].required}"
        >
        <label 
          :for="address.id"
        >
          {{address.name}}{{address.req ? '*' : ''}}:
        </label>
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
    yes: false,
    counter: 0,
    addressInputs: [
      {name: 'Индекс', id: 'index', req: false},
      {name: 'Страна', id: 'country', req: false},
      {name: 'Область', id: 'region', req: false},
      {name: 'Город', id: 'city', req: true},
      {name: 'Улица', id: 'street', req: false},
      {name: 'Дом', id: 'house', req: false}
    ],
    personInputs: [
      {name: 'Фамилия', id: 'surname', type: 'text', req: true, minimumLength: false},
      {name: 'Имя', id: 'name', type: 'text', req: true, minimumLength: false},
      {name: 'Отчество', id: 'patronymic', type: 'text', req: false, minimumLength: false},
      {name: 'Дата рождения', id: 'dob', type: 'date', req: true, minimumLength: false},
      {name: 'Номер телефона', id: 'phone', type: 'tel', req: true, minimumLength: true},
      {name: 'Пол', id: 'gender', type: 'text', req: false, minimumLength: false}
    ],
    personSelectors: [
      {name: 'Группа клиентов', id: 'group', type: 'select', options: ['VIP', 'Проблемные', 'ОМС'], multiple: true, req: true, minimumLength: false},
      {name: 'Лечащий врач', id: 'doctor', type: 'select', options: ['Иванов', 'Захаров', 'Чернышева'], multiple: false, req: false, minimumLength: false}
    ],
    obj1: {
      surname: '',
      name: '',
      patronymic: '',
      dob: '',
      phone: 7,
      gender: '',
      group: [],
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
      console.log(this.$v)
      if (this.$v.$invalid) {
        
        this.$v.$touch()
        return
      }

      const formData = {
        ...this.obj1,
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