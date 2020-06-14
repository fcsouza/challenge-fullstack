import { Router } from 'express';
import TranslateRepository from '../repository/TranslateRepository';
import TranslateService from '../services/TranslateService';

const translateRouter = Router();
const translateRepository = new TranslateRepository();

translateRouter.get('/translate/:id', (req, res) => {
  try {
    const { id } = req.params;
    const number = Number(id);

    const validationsTranslateNumber = new TranslateService(translateRepository);

    const word = validationsTranslateNumber.execute({ number });

    return res.status(200).json(word);
  } catch (err) {
    return res.status(400).json(err.message);
  }
});

export default translateRouter;
