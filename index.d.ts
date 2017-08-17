// Type definitions for Magento 2
// Project: https://magento2.com/
// Definitions by: Dave Macaulay <https://github.com/DaveMacaulay/>
// Definitions: https://github.com/DaveMacaulay/types-magento2

/**
 * Support for mage/translate $t syntax
 */
interface MageTranslate {
    /**
     * Translate the string using the $t('text') format
     * 
     * @example $t('Testing')
     */
    (text: string): string;
}

declare var $t: MageTranslate;
declare module 'mage/translate' {
    export = $t;
}

/**
 * Support for uiClass
 */
interface MageUiClass {
    defaults: MageUiClassDefaults;

    /**
     * Create new instance of UI class
     * @param args
     */
    new(...args: Array<any>): MageUiClass;

    /**
     * Entry point to the initialization of consturctors' instance.
     *
     * @param {Object} [options={}]
     * @returns {Class} Chainable.
     */
    initialize(options: object): MageUiClass;

    /**
     * Recursively extends data specified in constructors' 'defaults'
     * property with provided options object. Evaluates resulting
     * object using string templates (see: mage/utils/template.js).
     *
     * @param {Object} [options={}]
     * @returns {Class} Chainable.
     */
    initConfig(options: object): MageUiClass;

    /**
     * Creates new constructor based on a current prototype properties,
     * extending them with properties specified in 'exender' object.
     *
     * @param {Object} [extender={}]
     * @returns {Function} New constructor.
     */
    extend(extender: MageUiClass): MageUiClass;
}

interface MageUiClassDefaults {
    ignoreTmpls: MageUiClassDefaultsIgnoreTmpls
}

interface MageUiClassDefaultsIgnoreTmpls {
    templates: boolean
}

declare var uiClass: MageUiClass;
declare module 'uiClass' {
    export = uiClass;
}

/**
 * Support for uiElement
 */
interface MageUiElement extends MageUiClass, MageUiLinks, MageUiEvents {
    defaults: MageUiElementDefaults;

    /**
     * Initializes observable properties.
     *
     * @returns {MageUiElement}
     */
    initObservable(): MageUiElement;

    /**
     * Parses 'modules' object and creates
     * async wrappers for specified components.
     *
     * @returns {MageUiElement} Chainable.
     */
    initModules(): MageUiElement;

    /**
     * Called when current element was injected to another component.
     *
     * @param {Object} parent - Instance of a 'parent' component. @todo determine type of parents
     * @returns {MageUiElement} Chainable.
     */
    initContainer(parent: object): MageUiElement;

    /**
     * Initializes statefull properties
     * based on the keys of 'statefull' object.
     *
     * @returns {MageUiElement} Chainable.
     */
    initStatefull(): MageUiElement;

    /**
     * Initializes links between properties.
     *
     * @returns {MageUiElement} Chainbale.
     */
    initLinks(): MageUiElement;

    /**
     * Initializes listeners of the unique property.
     *
     * @returns {MageUiElement} Chainable.
     */
    initUnique(): MageUiElement;

    /**
     * Makes specified property to be stored automatically.
     *
     * @param {String} key - Name of the property
     *      that will be stored.
     * @param {String} [path=key] - Path to the property in storage.
     * @returns {MageUiElement} Chainable.
     */
    setStatefull(key: string, path: string): MageUiElement;

    /**
     * Updates property specified in uniqueNs
     * if elements' unique property is set to 'true'.
     *
     * @returns {MageUiElement} Chainable.
     */
    setUnique(): MageUiElement;

    /**
     * Creates 'async' wrapper for the specified component
     * using uiRegistry 'async' method and caches it
     * in a '_requested' components  object.
     *
     * @param {String} name - Name of requested component.
     * @returns {Function} Async module wrapper.
     */
    requestModule(name: string): Function;

    /**
     * Returns path to elements' template.
     *
     * @returns {String}
     */
    getTemplate(): string;

    /**
     * Checks if template was specified for an element.
     *
     * @returns {Boolean}
     */
    hasTemplate(): boolean;

    /**
     * Returns value of the nested property.
     *
     * @param {String} path - Path to the property.
     * @returns {*} Value of the property.
     */
    get(path: string): any;

    /**
     * Sets provided value as a value of the specified nested property.
     * Triggers changes notifications, if value has mutated.
     *
     * @param {String} path - Path to property.
     * @param {*} value - New value of the property.
     * @returns {MageUiElement} Chainable.
     */
    set(path: string, value: string): MageUiElement;

    /**
     * Removes nested property from the object.
     *
     * @param {String} path - Path to the property.
     * @returns {MageUiElement} Chainable.
     */
    remove(path: string): MageUiElement;

    /**
     * Creates observable properties for the current object.
     *
     * If 'useTrack' flag is set to 'true' then each property will be
     * created with a ES5 get/set accessor descriptors, instead of
     * making them an observable functions.
     * See 'knockout-es5' library for more information.
     *
     * @param {Boolean} [useAccessors=false] - Whether to create an
     *      observable function or to use property accesessors.
     * @param {(Object|String|Array)} properties - List of observable properties.
     * @returns {MageUiElement} Chainable.
     *
     * @example Sample declaration and equivalent knockout methods.
     *      this.key = 'value';
     *      this.array = ['value'];
     *
     *      this.observe(['key', 'array']);
     *      =>
     *          this.key = ko.observable('value');
     *          this.array = ko.observableArray(['value']);
     *
     * @example Another syntaxes of the previous example.
     *      this.observe({
         *          key: 'value',
         *          array: ['value']
         *      });
     */
    observe(useAccessors: boolean, properties: object | string | Array<any>): MageUiElement;

    /**
     * Delegates call to 'observe' method but
     * with a predefined 'useAccessors' flag.
     *
     * @param {(String|Array|Object)} properties - List of observable properties.
     * @returns {MageUiElement} Chainable.
     */
    track(properties: string | Array<any> | object): MageUiElement;

    /**
     * Checks if specified property is tracked.
     *
     * @param {String} property - Property to be checked.
     * @returns {Boolean}
     */
    isTracked(property: string): boolean;

    /**
     * Extracts all stored data and sets it to element.
     *
     * @returns {MageUiElement} Chainable.
     */
    restore(): MageUiElement;

    /**
     * Stores value of the specified property in components' storage module.
     *
     * @param {String} property
     * @param {*} [data=this[property]]
     * @returns {MageUiElement} Chainable.
     */
    store(property: string, data: any): MageUiElement;

    /**
     * Extracts specified property from storage.
     *
     * @param {String} [property] - Name of the property
     *      to be extracted. If not specified then all of the
     *      stored will be returned.
     * @returns {*}
     */
    getStored(property: string): any;

    /**
     * Removes stored property.
     *
     * @param {String} property - Property to be removed from storage.
     * @returns {MageUiElement} Chainable.
     */
    removeStored(property: string): MageUiElement;

    /**
     * Destroys current instance along with all of its' children.
     * @param {Boolean} skipUpdate - skip collection update when element to be destroyed.
     */
    destroy(skipUpdate: boolean): void;

    /**
     * Overrides 'EventsBus.trigger' method to implement events bubbling.
     *
     * @param {...*} arguments - Any number of arguments that should be passed to the events' handler.
     * @returns {Boolean} False if event bubbling was canceled.
     */
    bubble(): boolean;

    /**
     * Callback which fires when property under uniqueNs has changed.
     */
    onUniqueUpdate(name: string): void;

    /**
     * Clean data form data source.
     *
     * @returns {MageUiElement} Chainable.
     */
    cleanData(): MageUiElement;

    /**
     * Fallback data.
     */
    cacheData(): void;

    /**
     * Update configuration in component.
     *
     * @param {*} oldValue
     * @param {*} newValue
     * @param {String} path - path to value.
     * @returns {MageUiElement}
     */
    updateConfig(oldValue: any, newValue: any, path: string): MageUiElement;
}

/**
 * uiElement extends directly from ./links.js
 */
interface MageUiLinks {
    /**
     * Set listeners for links
     *
     * @param listeners
     */
    setListeners(listeners: object): MageUiLinks;

    /**
     * Set links with direction
     *
     * @param links
     * @param direction
     */
    setLinks(links: object, direction: string): MageUiLinks;
}

interface MageUiElementDefaults extends MageUiClassDefaults {
    _requesetd: object;
    containers: Array<any>;
    exports: object;
    imports: object;
    links: object;
    listens: object;
    name: string;
    ns: string;
    provider: string;
    registerNodes: boolean;
    source: null | string;
    statefull: object;
    template: string;
    tracks: object;
    storageConfig: {
        provider: string;
        namespace: string;
        path: string;
    };
    maps: {
        imports: object;
        exports: object;
    };
    modules: {
        storage: object;
    };
}

declare var uiElement: MageUiElement;
declare module 'uiElement' {
    export = uiElement;
}

/**
 * Support for uiEvents
 */
interface MageUiEvents {
    /**
     * Calls callback when name event is triggered.
     *
     * @param {String}   events
     * @param {Function} callback
     * @param {String} ns @todo investigate what this is
     * @return {MageUiEvents}
     */
    on(events: string, callback: Function, ns: string): MageUiEvents;

    /**
     * Removed callback from listening to target event
     *
     * @param  {String} ns
     * @return {Object} reference to this
     */
    off(ns: string): MageUiEvents;

    /**
     * Triggers event and executes all attached callbacks.
     *
     * @param {String} name - Name of the event to be triggered.
     * @returns {Boolean}
     */
    trigger(name: string): boolean;
}

declare var uiEvents: MageUiEvents;
declare module 'uiEvents' {
    export = uiEvents;
}

/**
 * Support for uiCollection & uiComponent
 */
interface MageUiCollection extends MageUiElement {
    defaults: MageUiCollectionDefaults;

    /**
     * Called when another element was added to current component.
     *
     * @param {Object} elem - Instance of an element that was added.
     * @returns {MageUiCollection} Chainable.
     */
    initElement(elem: object): MageUiCollection;

    /**
     * Returns instance of a child found by provided index.
     *
     * @param {String} index - Index of a child.
     * @returns {Object}
     */
    getChild(index: string): object;

    /**
     * Requests specified components to insert
     * them into 'elems' array starting from provided position.
     *
     * @param {(String|Array)} elems - Name of the component to insert.
     * @param {Number} [position=-1] - Position at which to insert elements.
     * @returns {MageUiCollection} Chainable.
     */
    insertChild(elems: string | Array<any>, position: number): MageUiCollection;

    /**
     * Removes specified child from collection.
     *
     * @param {(Object|String)} elem - Child or index of a child to be removed.
     * @param {Boolean} skipUpdate - skip collection update when element to be destroyed.
     *
     * @returns {MageUiCollection} Chainable.
     */
    removeChild(elem: object, skipUpdate: boolean): MageUiCollection;

    /**
     * Destroys collection children with its' elements.
     */
    destroyChildren(): void;

    /**
     * Clear data. Call method "clear"
     * in child components
     *
     * @returns {MageUiCollection} Chainable.
     */
    clear(): MageUiCollection;

    /**
     * Checks if specified child exists in collection.
     *
     * @param {String} index - Index of a child.
     * @returns {Boolean}
     */
    hasChild(index: string): boolean;

    /**
     * Creates 'async' wrapper for the specified child
     * using uiRegistry 'async' method and caches it
     * in a '_requested' components  object.
     *
     * @param {String} index - Index of a child.
     * @returns {Function} Async module wrapper.
     */
    requestChild(index: string): Function;

    /**
     * Creates complete child name based on a provided index.
     *
     * @param {String} index - Index of a child.
     * @returns {String}
     */
    formChildName(index: string): string;

    /**
     * Retrieves requested region.
     * Creates region if it was not created yet
     *
     * @returns {*} @todo add depdency to KnockoutObservable
     */
    getRegion(name: string): any;

    /**
     * Replaces specified regions' data with a provided one.
     * Creates region if it was not created yet.
     *
     * @param {Array} items - New regions' data.
     * @param {String} name - Name of the region.
     * @returns {MageUiCollection} Chainable.
     */
    updateRegion(items: Array<any>, name: string): MageUiCollection;

    /**
     * Destroys collection along with its' elements.
     */
    destroy(): void;

    /**
     * Tries to call specified method of a current component,
     * otherwise delegates attempt to its' children.
     *
     * @param {String} target - Name of the method.
     * @param {...*} parameters - Arguments that will be passed to method.
     * @returns {*} Result of the method calls.
     */
    delegate(target: string): any;
}

interface MageUiCollectionDefaults extends MageUiElementDefaults {
    template: string,
    _elems: Array<any>,
    ignoreTmpls: MageUiCollectionDefaultIgnoreTmpls
}

interface MageUiCollectionDefaultIgnoreTmpls extends MageUiClassDefaultsIgnoreTmpls {
    childDefaults: boolean
}

declare var uiCollection: MageUiCollection;
declare module 'uiCollection' {
    export = uiCollection;
}
declare var uiComponent: MageUiCollection;
declare module 'uiComponent' {
    export = uiComponent;
}