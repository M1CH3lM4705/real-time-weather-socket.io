class DateValue {
  #date
  #language = 'pt-BR';
  constructor(date, options = null) {
    this.#date = new Date(date)
    this.options = options || { weekday: "long", hour: "numeric", minute: "numeric" };
  }

  weekdayAndHourAbreviation() {
    this.#date = Intl.DateTimeFormat(this.#language, this.options).format(this.#date);

    return this.#date;
  }

  weekdayAbreviation() {
    const strArr = this.weekdayAndHourAbreviation().split(',');
    return `${strArr[0].substring(0, 3)}, ${strArr[1]}`
  }
}

module.exports = DateValue;