<template>
  <form @submit.prevent="submitHandler">
    <h1>Регистрация клиента</h1>

    <div class="input-group" v-for="(item, idx) of inputsArray" :key="item.title" v-show="counter === idx">
      <h2>{{item.title}}</h2>

      <div 
        class="input-field"
        v-for="person of item.fields" 
        :key="person.id" 
        :class="{'input-field--checkbox': person.type === 'checkbox'}"
      >
        <small 
          class="helper-text" 
          v-if="(person.req && ($v.obj[person.id].$dirty && !$v.obj[person.id].required)) 
            || (person.minimumLength && ($v.obj[person.id].$dirty && !$v.obj[person.id].minLength))"
        >
          {{
            person.minimumLength && !$v.obj[person.id].minLength 
            ? 'Длина номера ' + (obj[person.id].length || '1') + ' из ' + $v.obj[person.id].$params.minLength.min 
            : 'Поле не должно быть пустым'
          }}
        </small>

        <select 
          class="select"
          @blur="person.req && $v.obj[person.id].$touch()"
          v-if="person.type === 'select'"
          v-model="obj[person.id]" 
          :id="person.id" 
          :multiple="person.multiple && 'multiple'"
          :size="person.multiple && person.options.length"
          :class="{'invalid': person.req && ($v.obj[person.id].$dirty && !$v.obj[person.id].required)}"
        >
          <option v-for="opt of person.options" :key="opt">{{opt}}</option>
        </select>

        <template v-else-if="person.type === 'checkbox'">
          <input v-model="obj[person.id]" type="checkbox" :id="person.id">
        </template>

        <template v-else>
          <input
            class="input"
            @blur="(person.req || person.minimumLength) && $v.obj[person.id].$touch()"
            :id="person.id"
            :type="person.type"
            v-model="obj[person.id]"
            :class="{'invalid': (person.req && ($v.obj[person.id].$dirty && !$v.obj[person.id].required)) 
              || (person.minimumLength && ($v.obj[person.id].$dirty && !$v.obj[person.id].minLength))}"
          >
        </template>
        
        <label 
          :for="person.id"
        >
          {{person.name}}{{person.req ? '*' : ''}}
        </label>
      </div>
    </div>

    <div class="button-group">
      <div class="button-group--pagination">
        <button 
          type="button" 
          v-if="counter > 0" 
          @click="counter--"
        >
          Назад
        </button>
        <button 
          type="button" 
          v-if="counter === 0 || counter !== 2" 
          @click="counter++"
        >
          Далее
        </button>
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
      opacity: 0
      transition: .25s
      animation: show .5s 1
      animation-fill-mode: forwards
      animation-delay: .25s

    .helper-text
      font-size: 16px
      color: $error-color
      opacity: 0
      transition: .25s
      animation: show .5s 1
      animation-fill-mode: forwards
      animation-delay: .25s

  .input-field--checkbox
    display: block

    input
      width: 16px
      height: 16px
      margin-right: 1rem
    
    label
      color: $dark-color

@keyframes show
  0%
    opacity: .3
  
  100% 
    opacity: 1

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

      label
        font-size: 18px

    .button-group
      margin: 0 2rem
      
      button[type="submit"]
        font-size: 24px
        padding: 1rem
      
      button[type="button"]
        font-size: 24px
</style>