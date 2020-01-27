<template>
    <div class="container">
        <loading :active.sync="isLoading" 
        :is-full-page="fullPage"
        color="#375bb5"></loading>
        <div class="row justify-content-center">
            <div class="table-responsive">
                <div style="background: #bebebf; padding: 0.6em;">
                    <b-button @click="test2" variant="danger" style="margin:0.5em;">
                        <i class="fa fa-file-pdf-o"></i>
                        <span v-if="count > 0"> ( {{ count }} )</span>
                    </b-button>
                    <b-button @click="test2" variant="success">
                        <i class="fa fa-file-excel-o"></i>
                        <span v-if="count > 0"> ( {{ count }} )</span>
                    </b-button>
                </div>
                <kendo-datasource ref="datasource1"
                    :schema-total="'total'"
                    :schema-data="'data'"
                    :transport-read-url="'http://batebol.test/api/services'"
                    :transport-parameter-map="parameterMap"
                    :page-size='15'
                    :server-paging="true"
                    :server-filtering="true"
                    :server-sorting="true"
                    :schema-model-fields="dsSchemaFields">
                </kendo-datasource>

                <kendo-grid 
                    ref="grid"
                    :data-source-ref="'datasource1'"
                    :no-records="true"
                    :messages-no-records="'NO EXISTEN RESULTADOS'"
                    :groupable="true"
                    :filterable="filterableConfig"
                    :navigatable="true"
                    :pageable-always-visible="true"
                    :pageable-page-sizes="[10, 20, 50, 100]"
                    :pageable-button-count="3"
                    :pageable-responsive="true"
                    :sortable="true"
                >
                    <kendo-grid-column :selectable="true" :width="45"></kendo-grid-column>
                    <kendo-grid-column 
                        :field="'nro'"
                        :title="'NRO'"
                        :width="95"
                        :media="'(min-width: 95px)'"
                        :filterable-cell-operator="'contains'"
                        :filterable-cell-suggestion-operator="'contains'"
                    ></kendo-grid-column>
                    <kendo-grid-column 
                        :field="'state'"
                        :title="'ESTADO'"
                        :width="115"
                        :media="'(min-width: 115px)'"
                        :filterable-cell-show-operators="false"
                        :filterable-cell-template="stateFilter"
                    ></kendo-grid-column>
                    <kendo-grid-column 
                        :field="'reception_date'"
                        :title="'RECIBIDO'"
                        :format="'{0:dd/MM/yyyy}'"
                        :width="110"
                        :media="'(min-width: 110px)'"
                    ></kendo-grid-column>
                    <kendo-grid-column 
                        :field="'diagnostic'"
                        :title="'DIAGNÓSTICO'"
                        :width="110"
                        :filterable-cell-show-operators="false"
                        :filterable-cell-template="diagnosticFilter"
                    ></kendo-grid-column>
                    <kendo-grid-column 
                        :field="'employee'"
                        :title="'TÉCNICO'"
                        :width="160"
                        :filterable-cell-show-operators="false"
                        :filterable-cell-template="employeeFilter"
                    ></kendo-grid-column>
                </kendo-grid>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                dsSchemaFields: {
                    nro: { type: "string" },
                    state: { type: "string" },
                    reception_date: { type: "date", format: 'dd/MM/yyyy' },
                    diagnostic: { from: "diagnostic.code"  },
                    employee: { from: "employee.full_name" },
                },
                filterableConfig: {
                    // extra: false,
                    mode: 'row',
                    operators: {
                        string: {
                            qe: 'Es igual a',
                            neq: 'No es igual a',
                            contains: 'Contiene',
                            doesnotcontain: 'No contiene',
                            startswitch: 'Comienza con',
                            endswitch: 'Termina en'
                        },
                        date: { 
                            lte: 'Antes o igual a', 
                            gte: 'Después o igual a'
                        }
                    }
                },
                count: 0,
                isLoading: false,
                fullPage: true
            }
        },

        methods: {
            stateFilter(element) {
                let condition = [
                    {name: "PENDIENTE", id: "PENDIENTE"}, 
                    {name: "ENTREGADO", id: "ENTREGADO"} 
                ];

                element.element.kendoDropDownList({
                    dataSource: condition,
                    dataTextField: "name",
                    change: function(e){},
                    valuePrimitive: true,
                    dataValueField: "id",
                    optionLabel: {
                      name: "-Seleccione-",
                      id: ""
                    }
                });
            },

            diagnosticFilter(element) {
                let dataSource = new kendo.data.DataSource({
                  transport: {
                    read: {
                      url: "http://batebol.test/api/diagnostics-filter",
                      dataType: "json"
                    }
                  }
                });
              
                element.element.kendoDropDownList({
                    dataSource: dataSource,
                    dataTextField: "code",
                    change: function(e){},
                    valuePrimitive: true,
                    dataValueField: "id",
                    optionLabel: {
                      code: "-Seleccione-",
                      id: ""
                    }
                });
            },

            employeeFilter(element) {
                let dataSource = new kendo.data.DataSource({
                  transport: {
                    read: {
                      url: "http://batebol.test/api/employees-filter",
                      dataType: "json"
                    }
                  }
                });
              
                element.element.kendoDropDownList({
                    dataSource: dataSource,
                    dataTextField: "full_name",
                    change: function(e){},
                    valuePrimitive: true,
                    dataValueField: "id",
                    optionLabel: {
                      full_name: "-Seleccione-",
                      id: ""
                    }
                });
            },

            formatDate(OrderDate) {
                let formatedOrderDate = kendo.format("{0:yyyy-MM-dd}", OrderDate);
                return formatedOrderDate;
            },

            parameterMap: function (data, type) {
                if (type == "read" && data.filter !== undefined) {
                    let dates = data.filter.filters.filter(e => e.operator == "lte" || e.operator == "gte");
                    if (dates.length > 0) {
                        data.filter.filters.forEach( item => {
                            if (dates.includes(item)) {
                                item.value = this.formatDate(item.value);
                            }
                        });
                    }
                    return data;
                } else return data;
            },

            test2(){
                this.isLoading = true;
                // simulate AJAX
                setTimeout(() => {
                  this.isLoading = false
                },5000)
            }
        }
    }
</script>

<style scoped>
    .k-grid {
        font-size: 12px;
        font-weight: bold;
    }

    >>> .k-grouping-header {
        color: #767676;
        background-color: #e8e8e8;
    }

    >>> .k-grouping-header .k-group-indicator {
        border-color: #979797;
    }

    >>> .k-grid-header {
        background-color: #f5faff;
    }
    /*>>> .k-link { font-weight: bold; font-size: 15px; }*/
    >>> .k-grid-header .k-grid-header-wrap th.k-header {
        text-align:center;
        /*padding: 0.5em;*/
    }
   
    >>>.k-grid tbody tr {
        line-height: 20px;
        text-align: center;
    }

    >>> .k-grid tbody td {
        padding: 0.5em;
    }
</style>
