import TranslateRepository from '../repository/TranslateRepository';

interface Request {
  number: number;
}

class TranslateService {
  private translateRepository: TranslateRepository;

  constructor(translateRepository: TranslateRepository) {
    this.translateRepository = translateRepository;
  }

  public execute({ number }: Request) {
    const typeNumber = Number.isInteger(number);
    if (!typeNumber) {
      throw Error('Only whole numbers can be translated');
    };

    if (number < 1) {
      throw Error('It is not allowed to translate a number less than one');
    }

    if (number > 999999999999) {
      throw Error('Converting a number greater than 999999999999 is not allowed');
    }

    const word = this.translateRepository.translateNumber(number);

    if (!word) {
      throw Error('Could not translate the reported number...');
    }

    return word;
  }
}

export default TranslateService;