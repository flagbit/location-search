import { IController } from 'angular';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { DataServiceInstance } from '../../shared/data/data.service';
import { CONFIG } from '../../shared/config/config';

export class PaginationController implements IController {
  public subject: BehaviorSubject<any>;
  public currentPage: number;
  public pages: Array<any>;

  public subscribeData() {
    this.subject.subscribe(data => {
      if (data !== null) {
        console.log('+++ IN PAGINATION', data);
        this.currentPage = data.currentPage;
        let calculatedPages = Math.ceil(data.totalItems / CONFIG.itemsPerPage);
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
