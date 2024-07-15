import PbTable from '../pb_table'

class CustomTable extends PbTable {
    constructor(element) {
        super(element)
    }

    // Add any custom functionality or overrides here
    customMethod() {
        console.log('Custom method called HERE ---------------')
    }
}

export default CustomTable