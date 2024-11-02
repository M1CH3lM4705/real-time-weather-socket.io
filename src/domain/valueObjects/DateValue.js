const dayjs = require('dayjs');
const relativeTime = require('dayjs/plugin/relativeTime');

dayjs.extend(relativeTime);

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

  hourTimeFromNow() {
    const time = dayjs(this.#date);
    const now = dayjs();

    // Calcula a diferença em dias e horas
    const diffInDays = now.diff(time, 'day');
    const diffInHours = now.diff(time, 'hour');

    let t;

    if (diffInDays > 0) {
      t = `${diffInDays}d`; // Exibe em dias
    } else if (diffInHours > 0) {
      t = `${diffInHours}h`; // Exibe em horas
    } else {
      t = 'Agora mesmo'; // Caso a diferença seja de minutos ou segundos
    }

    return t;
  }
}

module.exports = DateValue;