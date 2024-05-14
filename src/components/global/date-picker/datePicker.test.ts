import { mount } from '@vue/test-utils';
import datePickerComponent from '@/components/global/date-picker/datePicker.template.vue';

describe('LocaleDateInput.vue', () => {
    // Тест на проверку того, что компонент DatePicker.vue отображает правильный формат для локализованных дат (MM/DD/YYYY)
    it('displays the correct format for US locale (MM/DD/YYYY)', async (): Promise<void> => {
        jest.spyOn(navigator, 'language', 'get').mockReturnValue('en_US');
        const wrapper = mount(datePickerComponent, {
            props: {
                dateInputPlaceholder: 'Date',
                dateValue: '2023-05-20',
            },
        });
        expect(wrapper.find('input').element.value).toBe('05/20/2023');
    });

    // Тест на проверку того, что компонент DatePicker.vue отображает правильный формат для нелокализованных дат (DD/MM/YYYY)
    it('displays the correct format for non-US locale (DD/MM/YYYY)', async (): Promise<void> => {
        jest.spyOn(navigator, 'language', 'get').mockReturnValue('en_GB');
        const wrapper = mount(datePickerComponent, {
            props: {
                dateInputPlaceholder: 'Date',
                dateValue: '2023-05-20',
            },
        });
        expect(wrapper.find('input').element.value).toBe('20/05/2023');
    });

    // Тест на проверку того, что компонент DatePicker.vue генерирует событие update:dateValue при изменении значения в поле ввода
    it('emits an updated dateValue when input is changed', async (): Promise<void> => {
        jest.spyOn(navigator, 'language', 'get').mockReturnValue('en_US');
        const wrapper = mount(datePickerComponent, {
            props: {
                dateInputPlaceholder: 'Date',
                dateValue: '2023-05-20',
            },
        });
        const input = wrapper.find('input');
        await input.setValue('12/31/2023');
        expect(wrapper.emitted('update:dateValue')?.[0]).toEqual(['2023-12-31']);
    });
});
