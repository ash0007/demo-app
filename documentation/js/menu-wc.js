'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">demo-app documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AppModule-2644fb4fb80cbd4b6af2e5b31b19178402394f158d85c14b86498dd9fc372fe32ec2ce6dfc7a51fcd12f971e5482a0485561a0037603807436bbd985b5590a9a"' : 'data-target="#xs-components-links-module-AppModule-2644fb4fb80cbd4b6af2e5b31b19178402394f158d85c14b86498dd9fc372fe32ec2ce6dfc7a51fcd12f971e5482a0485561a0037603807436bbd985b5590a9a"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-2644fb4fb80cbd4b6af2e5b31b19178402394f158d85c14b86498dd9fc372fe32ec2ce6dfc7a51fcd12f971e5482a0485561a0037603807436bbd985b5590a9a"' :
                                            'id="xs-components-links-module-AppModule-2644fb4fb80cbd4b6af2e5b31b19178402394f158d85c14b86498dd9fc372fe32ec2ce6dfc7a51fcd12f971e5482a0485561a0037603807436bbd985b5590a9a"' }>
                                            <li class="link">
                                                <a href="components/AppComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DemoComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DemoComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DrawAnimComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DrawAnimComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MapComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MapComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/StockListComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >StockListComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TreeChildComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TreeChildComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TreeParentComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TreeParentComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TreeViewComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TreeViewComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link" >AppRoutingModule</a>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#components-links"' :
                            'data-target="#xs-components-links"' }>
                            <span class="icon ion-md-cog"></span>
                            <span>Components</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="components-links"' : 'id="xs-components-links"' }>
                            <li class="link">
                                <a href="components/CanvasComponent.html" data-type="entity-link" >CanvasComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ClockComponent.html" data-type="entity-link" >ClockComponent</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/AIBInput.html" data-type="entity-link" >AIBInput</a>
                            </li>
                            <li class="link">
                                <a href="classes/AIBOutput.html" data-type="entity-link" >AIBOutput</a>
                            </li>
                            <li class="link">
                                <a href="classes/BinarySystem.html" data-type="entity-link" >BinarySystem</a>
                            </li>
                            <li class="link">
                                <a href="classes/BinaryUtil.html" data-type="entity-link" >BinaryUtil</a>
                            </li>
                            <li class="link">
                                <a href="classes/BinUtil.html" data-type="entity-link" >BinUtil</a>
                            </li>
                            <li class="link">
                                <a href="classes/BooleanMagicBox.html" data-type="entity-link" >BooleanMagicBox</a>
                            </li>
                            <li class="link">
                                <a href="classes/Clock.html" data-type="entity-link" >Clock</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateJS_Shapes.html" data-type="entity-link" >CreateJS_Shapes</a>
                            </li>
                            <li class="link">
                                <a href="classes/Matrix.html" data-type="entity-link" >Matrix</a>
                            </li>
                            <li class="link">
                                <a href="classes/MatrixGenerator.html" data-type="entity-link" >MatrixGenerator</a>
                            </li>
                            <li class="link">
                                <a href="classes/MatrixUtil.html" data-type="entity-link" >MatrixUtil</a>
                            </li>
                            <li class="link">
                                <a href="classes/NodeType.html" data-type="entity-link" >NodeType</a>
                            </li>
                            <li class="link">
                                <a href="classes/NumberMatrix.html" data-type="entity-link" >NumberMatrix</a>
                            </li>
                            <li class="link">
                                <a href="classes/NumberMatrixUtil.html" data-type="entity-link" >NumberMatrixUtil</a>
                            </li>
                            <li class="link">
                                <a href="classes/Tree.html" data-type="entity-link" >Tree</a>
                            </li>
                            <li class="link">
                                <a href="classes/Tree-1.html" data-type="entity-link" >Tree</a>
                            </li>
                            <li class="link">
                                <a href="classes/TreeDataSource.html" data-type="entity-link" >TreeDataSource</a>
                            </li>
                            <li class="link">
                                <a href="classes/TreeNode.html" data-type="entity-link" >TreeNode</a>
                            </li>
                            <li class="link">
                                <a href="classes/TreeNode-1.html" data-type="entity-link" >TreeNode</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/DynamicDatabase.html" data-type="entity-link" >DynamicDatabase</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DynamicDataSource.html" data-type="entity-link" >DynamicDataSource</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DynamicLoaderService.html" data-type="entity-link" >DynamicLoaderService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/FinnhubApiService.html" data-type="entity-link" >FinnhubApiService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#guards-links"' :
                            'data-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/MapResolver.html" data-type="entity-link" >MapResolver</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/DynamicFlatNode.html" data-type="entity-link" >DynamicFlatNode</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IAnimateShape.html" data-type="entity-link" >IAnimateShape</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ICenter.html" data-type="entity-link" >ICenter</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ICenter-1.html" data-type="entity-link" >ICenter</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ICenter-2.html" data-type="entity-link" >ICenter</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ICenter-3.html" data-type="entity-link" >ICenter</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ICircleConfig.html" data-type="entity-link" >ICircleConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IClock.html" data-type="entity-link" >IClock</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IGraphics.html" data-type="entity-link" >IGraphics</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/INumberMatrixOps.html" data-type="entity-link" >INumberMatrixOps</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IShapeObject.html" data-type="entity-link" >IShapeObject</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IStrokeStyle.html" data-type="entity-link" >IStrokeStyle</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IStrokeStyle-1.html" data-type="entity-link" >IStrokeStyle</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SystemOutput.html" data-type="entity-link" >SystemOutput</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/typealiases.html" data-type="entity-link">Type aliases</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});