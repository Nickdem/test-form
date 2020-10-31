import {required, minLength} from 'vuelidate/lib/validators'

const mixin = {
  data: () => ({
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
      {name: 'Пол', id: 'gender', type: 'text', req: false, minimumLength: false},
      {name: 'Группа клиентов', id: 'group', type: 'select', options: ['VIP', 'Проблемные', 'ОМС'], multiple: true, req: true, minimumLength: false},
      {name: 'Лечащий врач', id: 'doctor', type: 'select', options: ['Иванов', 'Захаров', 'Чернышева'], multiple: false, req: false, minimumLength: false}
    ],
    passInputs: [
      {name: 'Тип документа', id: 'docType', type: 'select', options: ['Паспорт', 'Свидетельство о рождении', 'Вод. удостоверение'], req: true},
      {name: 'Серия', id: 'series', req: false},
      {name: 'Номер', id: 'number', req: false},
      {name: 'Кем выдан', id: 'issued', req: false},
      {name: 'Дата выдачи', id: 'doi', req: true}
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
    submitHandler () {
      if (this.$v.$invalid) {
          console.log(this.$v)
          this.$v.$touch()
          this.counter = 0
          this.$emit('helper', 'Проверьте все поля формы')
          return
      }

      const formData = {
          ...this.obj1,
          ...this.obj2,
          ...this.obj3,
      }

      console.log(formData)
      this.$emit('helper', 'Поздравляем, вы успешно зарегестрировались!')
      this.$v.$reset()

      this.obj1.surname = this.obj1.name = this.obj1.patronymic = this.obj1.dob = this.obj1.dob = this.obj1.gender = this.obj1.doctor =  ''

      this.obj1.phone = 7
      this.obj1.group = []
      this.obj1.withoutSms = true

      this.obj2.index = this.obj2.country = this.obj2.region = this.obj2.city = this.obj2.street = this.obj2.house = ''

      this.obj3.docType = this.obj3.series = this.obj3.number = this.obj3.issued = this.obj3.doi = ''
    }
  }
}

export default mixin