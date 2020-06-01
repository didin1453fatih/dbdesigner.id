module.exports = {
  /**
   * Setup is javascript runtime to change this 
   * project like windows installer
   * {{not yet implementation}}
   */
  setup: {},
  /**
   * worker is global access function
   * to call this worker like this 
   * mukmin.__core.doSomething()
   */
  worker: {
    experimental: {
      target: "worker/experimental"
    }
  },
  /**
   * Event is a function who triggered when in some condition or state
   * there are 2 types of this event
   * first is load event and second is action event
   * Load event is event is triggered when mukmin JS load 
   * Action event is triggered after mukmin JS running
   * Event Load  :
   * 1. onAppBeforeLoad({mukmin,arg}) --> this is triggered when app load
   * 2. onWebBeforeLoad({mukmin,arg,app}) --> triggered when express import and setting web express
   * 3. onWebAfterLoad({mukmin,arg,app}) --> triggered when express is load
   * 4. onModelBeforeLoad({mukmin,arg,datastore}) -> not yet implementation
   * 5. onModelAfterLoad({mukmin,arg,datastore}) -> not yet implementation
   * 6. onAppAfterLoad({mukmin,arg})
   * 
   * 
   * Action event :
   * 1. onWebBeforeRoute
   * 2. onWebBeforeAction
   * 3. onWebAfterAction
   */

  system_event: {
    onWebBeforeLoad: {
      target: "event/onWebBeforeLoad",
      order: 0
    }
  },
  custom_event:{
    
  }
};
