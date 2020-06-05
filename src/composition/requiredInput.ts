import { ref, Ref, watch } from '@vue/composition-api';

export default function useRequiredInput(
  onSubmit: (name: Ref<string>) => void,
) {
  const input = ref('');
  const inputError = ref(false);

  function submit(): void {
    if (input.value.length) {
      onSubmit(input);
    } else {
      inputError.value = true;
    }
  }

  watch(
    () => input,
    () => {
      if (input.value.length) {
        inputError.value = false;
      }
    },
  );

  return { input, inputError, submit };
}
