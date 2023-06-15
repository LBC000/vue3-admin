<template>
  <div>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate"> 新增部门 </a-button>
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <TableAction
            :actions="[
              {
                icon: 'clarity:note-edit-line',
                onClick: handleEdit.bind(null, record),
              },
              {
                icon: 'ant-design:delete-outlined',
                color: 'error',
                popConfirm: {
                  title: '是否确认删除',
                  placement: 'left',
                  confirm: handleDelete.bind(null, record),
                },
              },
            ]"
          />
        </template>
      </template>
    </BasicTable>

    <DeptModal @register="registerModal" @success="handleSuccess" @visibleChange="visibleChange" />
  </div>
</template>
<script lang="ts" setup>
  import { addDept, deleteDept } from '/@/api/apis';

  import { defineComponent, ref } from 'vue';

  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { getDeptList } from '/@/api/demo/system';

  import { useModal } from '/@/components/Modal';
  import DeptModal from './DeptModal.vue';

  import { columns, searchFormSchema } from './dept.data';

  let sItem = ref({});

  const [registerModal, { openModal }] = useModal();
  const [registerTable, { reload }] = useTable({
    title: '部门列表',
    api: getDeptList,
    columns,
    formConfig: {
      labelWidth: 120,
      schemas: searchFormSchema,
    },
    pagination: false,
    striped: false,
    useSearchForm: true,
    showTableSetting: true,
    bordered: true,
    showIndexColumn: false,
    canResize: false,
    actionColumn: {
      width: 80,
      title: '操作',
      dataIndex: 'action',
      // slots: { customRender: 'action' },
      fixed: undefined,
    },
  });

  function handleCreate() {
    openModal(true, {
      isUpdate: false,
    });
  }

  function handleEdit(record: Recordable) {
    sItem.value = record;

    openModal(true, {
      record,
      isUpdate: true,
    });
  }

  function handleDelete(record: Recordable) {
    deleteDept({
      id: record.id,
    })
      .then((res) => {
        reload();
      })
      .catch((err) => {});
    console.log(record);
  }

  function handleSuccess(values) {
    // 新增
    let opt = {
      ...values,
      status: +values.status,
    };

    if (sItem.value.id) {
      opt.id = sItem.value.id;
    }

    addDept(opt)
      .then((res) => {
        console.log(res, '成功');
      })
      .catch((err) => {
        console.log(err, '失败');
      });

    console.log(sItem.value, opt, 'handleSuccess');

    setTimeout(() => {
      reload();
    }, 500);
  }

  function visibleChange(e) {
    if (e == false) {
      sItem.value = {};
    }

    // console.log("visibleChange", e);
  }
</script>
