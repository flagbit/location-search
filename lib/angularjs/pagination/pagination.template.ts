export const PaginationTemplate =
`<div ng-if="ctrl.currentPage.constructor.name === 'Number'">
  <strong>{{ ctrl.currentPage * ctrl.itemsPerPage + 1 }}</strong>
  to
  <strong>{{ ctrl.currentPage * ctrl.itemsPerPage + ctrl.itemsPerPage }}</strong>
  of
  <strong>{{ ctrl.totalItems }}</strong>
</div>
<ul class="pagination">
  <li
    ng-repeat="page in ctrl.pages track by $index"
    ng-class="{active: ctrl.currentPage === $index}">
    <a href="" ng-click="ctrl.gotoPage($index)">{{$index + 1}}</a>
  </li>
</ul>`;
