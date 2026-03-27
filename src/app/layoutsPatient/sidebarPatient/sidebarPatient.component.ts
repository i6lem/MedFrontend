import { Component, OnInit, EventEmitter, Output, ViewChild, ElementRef, HostListener } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MENU } from './menu';
import { MenuItem } from './menu.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-sidebar-patient',
  templateUrl: './sidebarPatient.component.html',
  standalone: false
})
export class SidebarPatientComponent implements OnInit {

  menu: any;
  toggle: any = true;
  menuItems: MenuItem[] = [];
  activeDropdownPos = { top: 0, left: 0 };

  @ViewChild('sideMenu') sideMenu!: ElementRef;
  @Output() mobileMenuButtonClicked = new EventEmitter();

  constructor(private router: Router, public translate: TranslateService) {
    translate.setDefaultLang('en');
  }

  ngOnInit(): void {
    this.menuItems = MENU;
    this.router.events.subscribe((event) => {
      if (document.documentElement.getAttribute('data-layout') != 'twocolumn') {
        if (event instanceof NavigationEnd) {
          this.initActiveMenu();
        }
      }
    });
  }

  ngAfterViewInit() {
    setTimeout(() => this.initActiveMenu(), 0);
  }

  // Ferme dropdown si click en dehors
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('.nav-item.dropdown')) {
      this.menuItems.forEach((item: any) => item.isCollapsed = true);
    }
  }

  toggleItem(item: any, event?: MouseEvent) {
    const wasCollapsed = item.isCollapsed;

    // Ferme tout
    this.menuItems.forEach((menuItem: any) => menuItem.isCollapsed = true);

    // Calcule position du dropdown selon l'élément cliqué
    if (!wasCollapsed) return;

    if (event) {
      const el = (event.currentTarget as HTMLElement);
      const rect = el.getBoundingClientRect();
      this.activeDropdownPos = {
        top: rect.bottom + 6,
        left: rect.left
      };
    }

    item.isCollapsed = false;
  }

  removeActivation(items: any) {
    items.forEach((item: any) => item.classList.remove('active'));
  }

  activateParentDropdown(item: any) {
    item.classList.add('active');
    let parentCollapseDiv = item.closest('.collapse.menu-dropdown');
    if (parentCollapseDiv) {
      parentCollapseDiv.parentElement.children[0].classList.add('active');
      if (parentCollapseDiv.parentElement.closest('.collapse.menu-dropdown')) {
        if (parentCollapseDiv.parentElement.closest('.collapse').previousElementSibling)
          parentCollapseDiv.parentElement.closest('.collapse').previousElementSibling.classList.add('active');
      }
      return false;
    }
    return false;
  }

  updateActive(event: any) {
    const ul = document.getElementById('navbar-nav');
    if (ul) {
      const items = Array.from(ul.querySelectorAll('a.nav-link'));
      this.removeActivation(items);
    }
    this.activateParentDropdown(event.target);
    this.menuItems.forEach((item: any) => item.isCollapsed = true);
  }

  initActiveMenu() {
    let pathName = window.location.pathname;
    if (environment.production) {
      pathName = pathName.replace('/velzon/angular/default', '');
    }
    const active = this.findMenuItem(pathName, this.menuItems);
    if (active) this.toggleItem(active);

    const ul = document.getElementById('navbar-nav');
    if (ul) {
      const items = Array.from(ul.querySelectorAll('a.nav-link'));
      let activeItems = items.filter((x: any) => x.classList.contains('active'));
      this.removeActivation(activeItems);
      let matchingMenuItem = items.find((x: any) => {
        if (environment.production) {
          let path = x.pathname.replace('/velzon/angular/default', '');
          return path === pathName;
        }
        return x.pathname === pathName;
      });
      if (matchingMenuItem) this.activateParentDropdown(matchingMenuItem);
    }
  }

  private findMenuItem(pathname: string, menuItems: any[]): any {
    for (const menuItem of menuItems) {
      if (menuItem.link && menuItem.link === pathname) return menuItem;
      if (menuItem.subItems) {
        const found = this.findMenuItem(pathname, menuItem.subItems);
        if (found) return found;
      }
    }
    return null;
  }

  hasItems(item: MenuItem) {
    return item.subItems !== undefined ? item.subItems.length > 0 : false;
  }

  toggleMobileMenu(event: any) {
    const sidebarsize = document.documentElement.getAttribute('data-sidebar-size');
    document.documentElement.setAttribute('data-sidebar-size',
      sidebarsize === 'sm-hover-active' ? 'sm-hover' : 'sm-hover-active');
  }

  SidebarHide() {
    document.body.classList.remove('vertical-sidebar-enable');
  }
  isActiveLink(link: string): boolean {
    return window.location.pathname === link;
  }
}