<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    :title="getTitle"
    @ok="handleSubmit"
  >
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>
<script lang="ts">
import { defineComponent, ref, computed, unref } from "vue";
import { BasicModal, useModalInner } from "/@/components/Modal";
import { BasicForm, useForm } from "/@/components/Form/index";
import { formSchema } from "./dept.data";

import { getDeptList } from "/@/api/demo/system";
import { addDept } from "/@/api/apis";
export default defineComponent({
  name: "DeptModal",
  components: { BasicModal, BasicForm },
  emits: ["success", "register"],
  setup(_, { emit }) {
    const isUpdate = ref(true);

    const [
      registerForm,
      { resetFields, setFieldsValue, updateSchema, validate },
    ] = useForm({
      labelWidth: 100,
      baseColProps: { span: 24 },
      schemas: formSchema,
      showActionButtonGroup: false,
    });

    const [registerModal, { setModalProps, closeModal }] = useModalInner(
      async (data) => {
        resetFields();
        setModalProps({ confirmLoading: false });
        isUpdate.value = !!data?.isUpdate;

        if (unref(isUpdate)) {
          setFieldsValue({
            ...data.record,
          });
        }

        const treeData = await getDeptList();

        updateSchema({
          field: "parentDept",
          componentProps: { treeData },
        });
      }
    );

    const getTitle = computed(() =>
      !unref(isUpdate) ? "新增部门" : "编辑部门"
    );

    async function handleSubmit() {
      try {
        const values = await validate();
        setModalProps({ confirmLoading: true });

        // 新增
        const addRes = await addDept({
          ...values,
          status: +values.status,
        })
          .then((res) => {
            closeModal();
            emit("success");
            console.log(res, "成功");
          })
          .catch((err) => {
            console.log(err, "失败");
          });

        console.log(values, addRes);
      } finally {
        setModalProps({ confirmLoading: false });
      }
    }

    return { registerModal, registerForm, getTitle, handleSubmit };
  },
});
</script>
