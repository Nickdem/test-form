<template>
  <form @submit.prevent="submitHandler">
    <h1>Регистрация клиента</h1>
    <div class="input-group" v-show="counter === 0">
      <h2>Общие данные</h2>

      <div 
        class="input-field"
        v-for="person of personInputs" 
        :key="person.id" 
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

        <select 
          class="select"
          v-if="person.type === 'select'"
          v-model="obj1[person.id]" 
          :id="person.id" 
          :multiple="person.multiple && 'multiple'"
          :size="person.multiple && person.options.length"
          :class="{'invalid': person.req && ($v.obj1[person.id].$dirty && !$v.obj1[person.id].required)}"
        >
          <option v-for="opt of person.options" :key="opt">{{opt}}</option>
        </select>

        <template v-else>
          <input
            class="input"
            :id="person.id"
            :type="person.type"
            v-model="obj1[person.id]"
            :class="{'invalid': (person.req && ($v.obj1[person.id].$dirty && !$v.obj1[person.id].required)) 
              || (person.minimumLength && ($v.obj1[person.id].$dirty && !$v.obj1[person.id].minLength))}"
          >
        </template>
        
        <label 
          :for="person.id"
        >
          {{person.name}}{{person.req ? '*' : ''}}:
        </label>
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
      <div 
        class="input-field"
        v-for="pass of passInputs" 
        :key="pass.id" 
      >
        <small 
          class="helper-text" 
          v-if="pass.req && ($v.obj3[pass.id].$dirty && !$v.obj3[pass.id].required)"
        >
          Поле не должно быть пустым
        </small>

        <select 
          class="select"
          v-if="pass.type === 'select'"
          v-model="obj3[pass.id]" 
          :id="pass.id" 
          :class="{'invalid': pass.req && ($v.obj3[pass.id].$dirty && !$v.obj3[pass.id].required)}"
        >
          <option v-for="opt of pass.options" :key="opt">{{opt}}</option>
        </select>

        <template v-else>
          <input
            class="input"
            :id="pass.id"
            type="text"
            v-model="obj3[pass.id]"
            :class="{'invalid': pass.req && ($v.obj3[pass.id].$dirty && !$v.obj3[pass.id].required)}"
          >
        </template>
        
        <label 
          :for="pass.id"
        >
          {{pass.name}}{{pass.req ? '*' : ''}}:
        </label>
      </div>
    </div>
    <div class="button-group">
      <div class="button-group--pagination">
        <button type="button" v-if="counter > 0" @click="counter--">предыдущая</button>
        <button type="button" v-if="counter === 0 || counter !== 2" @click="counter++">следующая</button>
      </div>
      <button type="submit">отправить</button>
    </div>
  </form>
</template>

<script>
import mixin from '@/mixins/createMixin'
export default {
  name: 'create-client',
  mixins: [mixin]
}
</script>

<style lang="sass">
$error-color: #d73c42
$dark-color: #6a6a6a
$standart-color: #08acad

form
  width: 80%
  margin: 0 auto
  background: #fff
  color: $standart-color
  padding: 10px
  box-shadow: 0 0 20px $dark-color
  border-radius: 15px

  h1 
    text-align: center
    margin: 0
    padding-top: 1rem
    padding-bottom: 1rem

.input-group
  display: flex
  flex-direction: column
  justify-content: space-between
  margin: 0

  .input-field
    margin-bottom: 1rem
    display: flex
    flex-direction: column-reverse
    font-size: 16px
    opacity: .3
    transition: .25s
    animation: show .5s 1
    animation-fill-mode: forwards
    animation-delay: .25s

    @keyframes show
      0%
        opacity: .3
      
      100% 
        opacity: 1

    label
      color: $dark-color

    .input,
    .select
      font-size: 24px
      padding: 1rem
      margin-top: 5px
      outline: none
      background-color: #f5f5f5
      border: none
      border-bottom: 1px solid $standart-color

    .invalid
      border-color: $error-color

    .helper-text
      font-size: 16px
      color: $error-color

  .input-field--checkbox
    display: block

    input
      width: 18px
      height: 18px
      margin-right: 1rem
    
    label
      color: $dark-color

.button-group
  display: flex
  flex-direction: row
  justify-content: space-between
  align-items: center
  
  button[type="submit"]
    font-size: 16px
    background-color: $standart-color
    color: #ffffff
    padding: 15px
    border-radius: 15px

  button[type="button"]
    font-size: 16px
    border: none
    background: none
    outline: none
    color: $dark-color
    cursor: pointer
    transition: top 1s ease-out 0.5s

@media screen and (min-width: 767px)
  form
    padding: 4rem
  
    .input-group
      margin: 0 2rem

    .button-group
      margin: 0 2rem
      
      button[type="submit"]
        font-size: 24px
        padding: 1rem
      
      button[type="button"]
        font-size: 24px


</style>