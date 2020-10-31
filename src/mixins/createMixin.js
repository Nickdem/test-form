import {required, minLength} from 'vuelidate/lib/validators'

const mixin = {
  data: () => ({
    counter: 0,
    inputsArray: [
      {title: 'Общие данные', fields: [
        {name: 'Фамилия', id: 'surname', type: 'text', req: true, minimumLength: false},
        {name: 'Имя', id: 'name', type: 'text', req: true, minimumLength: false},
        {name: 'Отчество', id: 'patronymic', type: 'text', req: false, minimumLength: false},
        {name: 'Дата рождения', id: 'dob', type: 'date', req: true, minimumLength: false},
        {name: 'Номер телефона', id: 'phone', type: 'tel', req: true, minimumLength: true},
        {name: 'Пол', id: 'gender', type: 'text', req: false, minimumLength: false},
        {name: 'Группа клиентов', id: 'group', type: 'select', options: ['VIP', 'Проблемные', 'ОМС'], multiple: true, req: true, minimumLength: false},
        {name: 'Лечащий врач', id: 'doctor', type: 'select', options: ['Иванов', 'Захаров', 'Чернышева'], multiple: false, req: false, minimumLength: false},
        {name: 'Не отправлять СМС', id: 'withoutSms', type: 'checkbox'}
      ]},
      {title: 'Адрес', fields: [
        {name: 'Индекс', id: 'index', type: 'text', req: false},
        {name: 'Страна', id: 'country', type: 'text', req: false},
        {name: 'Область', id: 'region', type: 'text', req: false},
        {name: 'Город', id: 'city', type: 'text', req: true},
        {name: 'Улица', id: 'street', type: 'text', req: false},
        {name: 'Дом', id: 'house', type: 'text', req: false}
      ]},
      {title: 'Паспорт', fields: [
        {name: 'Тип документа', id: 'docType', type: 'select', options: ['Паспорт', 'Свидетельство о рождении', 'Вод. удостоверение'], req: true},
        {name: 'Серия', id: 'series', type: 'text', req: false},
        {name: 'Номер', id: 'number', type: 'text', req: false},
        {name: 'Кем выдан', id: 'issued', type: 'text', req: false},
        {name: 'Дата выдачи', id: 'doi', type: 'text', req: true}
      ]}
    ],
    obj: {
      surname: '',
      name: '',
      patronymic: '',
      dob: '',
      phone: 7,
      gender: '',
      group: [],
      doctor: '',
      withoutSms: true,
      index: '',
      country: '',
      region: '',
      city: '',
      street: '',
      house: '',
      docType: '',
      series: '',
      number: '',
      issued: '',
      doi: ''
    }
  }),
  validations: {
    obj: {
      surname: {required},
      name: {required},
      dob: {required},
      phone: {required, minLength: minLength(11)},
      group: {required},
      city: {required},
      docType: {required},
      doi: {required}
    }
  },
  methods: {
    submitHandler () {
      if (this.$v.$invalid) {
          this.$v.$touch()
          this.counter = 0
          this.$emit('helper', 'Проверьте все поля формы')
          return
      }

      const formData = {
          ...this.obj
      }

      console.log(formData)
      this.$emit('helper', 'Поздравляем, вы успешно зарегестрировались!')
      this.$v.$reset()

      this.obj.surname = this.obj.name = this.obj.patronymic = this.obj.dob = this.obj.dob = this.obj.gender = this.obj.doctor =  ''
      this.obj.phone = 7
      this.obj.group = []
      this.obj.withoutSms = true
      this.obj.index = this.obj.country = this.obj.region = this.obj.city = this.obj.street = this.obj.house = ''
      this.obj.docType = this.obj.series = this.obj.number = this.obj.issued = this.obj.doi = ''

      this.counter = 0
    }
  }
}

export default mixin