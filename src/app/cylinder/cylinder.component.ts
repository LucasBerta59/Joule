import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { Cylinder } from './cylinder.interface';

import { CylinderService } from './cylinder.service';

@Component({
  selector: 'app-cylinder',
  templateUrl: './cylinder.component.html',
  styleUrls: ['./cylinder.component.scss']
})
export class CylinderComponent implements OnInit {
  private allCylinders: Cylinder[] = [];
  filters = { length: NaN, height: NaN, diameter: NaN, type: 'All' };
  maxHeightFilter = new FormControl('');
  maxDiameterFilter = new FormControl('');
  maxLengthFilter = new FormControl('');
  cylinders: Cylinder[] = [];
  cylinderTypes: string[] = ['All'];

  constructor(private cylinderService: CylinderService) {
    this.maxHeightFilter.valueChanges.pipe(debounceTime(300)).subscribe(height => this.changeHeightFilter(parseInt(height)));
    this.maxDiameterFilter.valueChanges.pipe(debounceTime(300)).subscribe(diameter => this.changeDiameterFilter(parseInt(diameter)));
    this.maxLengthFilter.valueChanges.pipe(debounceTime(300)).subscribe(diameter => this.changeLengthFilter(parseInt(diameter)));
  }

  ngOnInit(): void {
    this.fetchCylinders();
  }

  private changeHeightFilter(height: number): void {
    this.filters.height = height;
    this.search();
  }

  private changeDiameterFilter(diam: number): void {
    this.filters.diameter = diam;
    this.search();
  }

  private changeLengthFilter(length: number): void {
    this.filters.length = length;
    this.search();
  }

  private changeTypeFilter(type: string): void {
    this.filters.type = type;
    this.search();
  }

  private search(): any {
    const type = this.filters.type;
    const length = this.filters.length;
    const height = this.filters.height;
    const diam = this.filters.diameter;
    if (!height && !diam && !type) {
      this.cylinders = this.allCylinders;
      return;
    }
    this.cylinders = this.allCylinders
      .filter(item => type === 'All' ? true : item.type.toLowerCase() === type.toLowerCase())
      .filter(item => !length || item.length <= length)
      .filter(item => !height || item.height <= height)
      .filter(item => !diam || item.diameter <= diam);

    this.sort();
  }

  private sort(): void {
    if (this.filters.length) {
      this.cylinders.sort(this.sortByLengthAndDiam);
    } else if (this.filters.height) {
      this.cylinders.sort(this.sortByHeightAndDiam);
    } else if (this.filters.diameter) {
      this.cylinders.sort(this.sortByDiameterLengthAndheight);
    }
    if (this.filters.type !== 'All') {
      this.sortByTypeHeightAndDiam();
    }
  }

  private sortByLengthAndDiam(a: Cylinder, b: Cylinder): number {
    return b.length != a.length ? b.length - a.length : b.diameter - a.diameter;
  }

  private sortByHeightAndDiam(a: Cylinder, b: Cylinder): number {
    return b.height != a.height ? b.height - a.height : b.diameter - a.diameter;
  }

  private sortByDiameterLengthAndheight(a: Cylinder, b: Cylinder): number {
    if (b.diameter != a.diameter) {
      return b.diameter - a.diameter;
    }
    if (b.length) {
      return b.length - a.length;
    }
    return b.height - a.height;
  }

  private sortByTypeHeightAndDiam(): void {
    this.cylinders.sort((a, b) => {
      if (b.type !== a.type) {
        return -1
      }
      if (this.filters.length) {
        this.cylinders.sort(this.sortByLengthAndDiam);
      } else if (this.filters.height) {
        this.cylinders.sort(this.sortByHeightAndDiam);
      } else if (this.filters.diameter) {
        this.cylinders.sort(this.sortByDiameterLengthAndheight);
      }
      return 0;
    })
  }

  fetchCylinders(): void {
    let cylinders: Object[] = [];
    this.cylinderService.getCylinders().subscribe(data => {
      Object.values(data).map(item => {
        cylinders = cylinders.concat.apply(cylinders, Array.isArray(item) ? item : []);
      });
      this.allCylinders = cylinders.map(item => item as Cylinder);
      this.cylinders = this.allCylinders;
      this.setCylinderOptions();
    });
  }

  setCylinderOptions(): void {
    this.allCylinders.forEach(item => {
      if (!this.cylinderTypes.includes(item.type)) {
        this.cylinderTypes.push(item.type);
      }
    });
  }

  selectType(type: string) {
    this.changeTypeFilter(type);
  }

}
