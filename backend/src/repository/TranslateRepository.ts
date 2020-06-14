const baseNumbers = {
  base: [
    'zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight',
    'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen',
    'sixteen', 'seventeen', 'eighteen', 'nineteen'
  ],
  dozens: [
    'zero', 'ten', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy',
    'eighty', 'ninety'
  ]
}

class TranslateRepository {
  public translateNumber(number: number) {
    let word = '';

    if (number < 20) {
      if (number > 0) {
        return baseNumbers.base[number];
      } else {
        return word = '';
      }
    }

    if (number < 100) {
      const ten = baseNumbers.dozens[Math.floor(number / 10)];
      const unit = number % 10;

      word = unit ? ten + '-' + baseNumbers.base[unit] : ten;
    } else if (number < 1000) {
      const hundred = baseNumbers.base[Math.floor(number / 100)] + ' hundred';
      const restTen = number % 100;
      const ten = this.translateNumber(restTen);

      word = ten ? hundred + ' ' + ten : hundred;
    } else if (number < 1000000) {
      const thousand = this.translateNumber(Math.floor(number / 1000)) + ' thousand';
      const restHundred = number % 1000;
      const hundred = this.translateNumber(restHundred);

      word = hundred ? thousand + ' ' + hundred : thousand;
    } else if (number < 1000000000) {
      const million = this.translateNumber(Math.floor(number / 1000000)) + ' million';
      const restThousand = number % 1000000;
      const thousand = this.translateNumber(restThousand);

      word = thousand ? million + ' ' + thousand : million;
    } else if (number < 1000000000000) {
      const billion = this.translateNumber(Math.floor(number / 1000000000)) + ' billion';
      const restMillion = number % 1000000000;
      const million = this.translateNumber(restMillion);

      word = million ? billion + ' ' + million : billion;
    }

    return word;
  }
}

export default TranslateRepository;