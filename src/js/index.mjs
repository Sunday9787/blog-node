// import 'core-js'

export const values = Array(10).fill(0).map((it, i) => {
  return it + i
})

console.log(values)

class Preson {
  constructor (name, age) {
    this.name = name
    this.age = age
  }

  sayName() {
    alert('我的名字：' + this.name)
  }

  sayAge() {
    alert('我的年龄：' + this.age)
  }
}

export class Teacher extends Preson {
  constructor (name, age, position) {
    super(name, age)
    this.position = position
  }

  sayPosition() {
    alert('我的职位：' + this.position)
  }
}

// export var teacher = new Teacher('Edward', '22','班主任')
