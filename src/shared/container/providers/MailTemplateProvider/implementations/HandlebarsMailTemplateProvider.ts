import handlebars from 'handlebars';
import IMailProvider from "../models/IMailTemplateProvider";
import IParseMailTemplateDTO from '../dtos/IParseMailTemplateDTO';


class HandlebarsMailTemplateProvider implements IMailProvider {

  constructor() {
  }
  public async parse({ template, variables }: IParseMailTemplateDTO): Promise<string> {
    const parseTemplate = handlebars.compile(template);

    return parseTemplate(variables);

  }

}

export default HandlebarsMailTemplateProvider