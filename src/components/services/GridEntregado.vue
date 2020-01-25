<template>
    <div class="container">
        <loading :active.sync="isLoading" 
        :is-full-page="fullPage"
        color="#375bb5"></loading>
        <div class="row justify-content-center">
            <div class="table-responsive">
                <div style="background: #bebebf; padding: 0.6em;">
                    <b-button @click="test2" variant="outline-danger" style="margin:0.5em;">
                        <i class="fa fa-file-pdf-o"></i>
                        <span v-if="count > 0"> ( {{ count }} )</span>
                    </b-button>
                    <b-button @click="test2" variant="outline-success">
                        <i class="fa fa-file-excel-o"></i>
                        <span v-if="count > 0"> ( {{ count }} )</span>
                    </b-button>
                </div>
                <kendo-datasource ref="datasource1"
                    :schema-total="'total'"
                    :schema-data="'data'"
                    :transport-read-url="'http://127.0.0.1:8000/api/products'"
                    :transport-parameter-map="parameterMap"
                    :page-size='10'
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
                    <kendo-grid-column :selectable="true" :width="50"></kendo-grid-column>
                    <kendo-grid-column 
                        :field="'id'"
                        :title="'ID'"
                        :width="100"
                        :filterable="false"
                    ></kendo-grid-column>
                    <kendo-grid-column 
                        :field="'title'"
                        :title="'TITULO'"
                        :width="240"
                        :filterable-cell-operator="'contains'"
                        :filterable-cell-suggestion-operator="'contains'"
                    ></kendo-grid-column>
                    <kendo-grid-column 
                        :field="'category'"
                        :title="'CATEGORIA'"
                        :width="180"
                        :filterable-cell-operator="'contains'"
                        :filterable-cell-suggestion-operator="'contains'"
                    ></kendo-grid-column>
                    <kendo-grid-column 
                        :field="'created_at'"
                        :title="'FECHA'"
                        :format="'{0:dd/MM/yyyy}'"
                        :filterable-operators="{date: { lte: 'Before or equal to', gte: 'After or equal to'}}"
                        :width="180"
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
                    id: { type: "string" },
                    title: { type: "string" },
                    description: { type: "string" },
                    created_at: { type: "date", format: 'dd/MM/yyyy' },
                    category: { type: "string" }
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
                        }
                    }
                },
                count: 0,
                isLoading: false,
                fullPage: true
            }
        },

        mounted() {
            // var dataSource = new kendo.data.DataSource({
            //   transport: {
            //     read: {
            //       url: "https://demos.telerik.com/kendo-ui/service/products/read",
            //       dataType: "jsonp", // "jsonp" is required for cross-domain requests; use "json" for same-domain requests
            //       data: function() {
            //           return {
            //               skip: 0,
            //               take: 2
            //           };
            //       }
            //     }
            //   }
            // });
            // dataSource.fetch();
            const grid = this.$refs.grid.kendoWidget();
            const gridElement = grid.element;
            const toolbarElement = gridElement.find('.k-grid-toolbar');

            toolbarElement.on("click", "#btn-pdf", function (e) {
                console.log('hola')
            });
        },

        methods: {
            parameterMap: function (options, operation) {
                if (operation != "read") {
                    var d = new Date(options.created_at);
                    options.created_at = kendo.toString(kendo.parseDate(new Date(d), 'yyyy-MM-dd'), "dd/MM/yyyy");
                    
                    return options;
                }
                else { return options; }
            },

            toolbarTemplate: function() {
                const templateHtml =
                    `
                      <button id="btn-pdf" type="button" class="btn btn-secondary">Primary</button>
                    `;

                return kendo.template(templateHtml);
            },

            test2(){
                this.isLoading = true;
                // simulate AJAX
                setTimeout(() => {
                  this.isLoading = false
                },5000)
            },

            test (e) {
                //  var grid = document.getElementById('#grid').data("kendoGrid");
                // // var selectedDataItem = e != null ? e.sender.dataItem(e.sender.select()) : null;
                // //  console.log(e)
                var selectedRows = e.sender.select();
                var selectedDataItems = [];
                for (var i = 0; i < selectedRows.length; i++) {
                  var dataItem = e.sender.dataItem(selectedRows[i]);
                  selectedDataItems.push(dataItem.name);
                }
                console.log(selectedDataItems);
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
