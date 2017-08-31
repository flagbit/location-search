import { IController } from 'angular';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { DataServiceInstance } from '../../commons/services/data.service';
import { CONFIG } from '../../commons/config/config';

export class PaginationController implements IController {

  public subject: BehaviorSubject<any>;
  public currentPage: number;
  public totalItems: number;
  public itemsPerPage: number = CONFIG.itemsPerPage;
  public pages: Array<any>;

  public subscribeData() {
    this.subject.subscribe(data => {
      if (data !== null) {
        console.log('+++ IN PAGINATION', data);
        this.currentPage = data.currentPage;
        this.totalItems = data.totalItems;
        let calculatedPages = Math.ceil(this.totalItems / this.itemsPerPage);
        if (calculatedPages <= 1) {
          calculatedPages = 0;
        }
        this.pages = new Array(calculatedPages);
      }
    });
  }

  public gotoPage(pageNum: number): void {
    DataServiceInstance.gotoPage(pageNum);
  }

  $onInit() {
    this.subscribeData();
  }

}
