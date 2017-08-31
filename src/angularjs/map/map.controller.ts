import { IController, IAugmentedJQuery } from 'angular';
import { AbstractMapController } from '../../commons/controllers/abstract.map.controller';

export class MapController extends AbstractMapController implements IController {

  public subject: any;

  constructor(
    private $element: IAugmentedJQuery
  ) {
    super();
    this.element = $element[0];
  }

  $onInit() {
    this.renderMap();
  }

}
