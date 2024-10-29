<template>
    <div class="range-selector" @click="checkOutsideClick">
        <div class="range-selector-trigger" @click.stop="toggleDropdown">
            <div class="input-wrapper">
                <input type="text" :value="displayedRange.join(' - ')" placeholder="选择范围" readonly />
                <span class="clear-button" v-if="selectedRange.length" @click.stop="clearSelection">x</span>
            </div>
        </div>
        <div class="range-selector-dropdown" v-if="isDropdownVisible">
            <div class="calendar-cell" v-for="day in options" :key="day.value" :class="getCellClass(day.value)"
                @click.stop="selectDay(day.value)" @mouseover="hoverDay(day.value)">
                {{ day.label }}
            </div>
        </div>
    </div>
</template>
  
<script>
export default {
    props: {
        options: {
            type: Array,
            default: () => [
                { label: 'WK1', value: 1 },
                { label: 'WK2', value: 2 },
                { label: 'WK3', value: 3 },
                { label: 'WK4', value: 4 },
                { label: 'WK5', value: 5 },
                { label: 'WK6', value: 6 },
            ]
        },
    },
    data() {
        return {
            isDropdownVisible: false,
            selectedRange: [],
            startDay: null,
            endDay: null,
            currentHoverDay: null,
        };
    },
    computed: {
        displayedRange() {
            return this.selectedRange.map(value => {
                const option = this.options.find(option => option.value === value);
                return option ? option.label : '';
            });
        },
    },
    methods: {
        toggleDropdown() {
            this.isDropdownVisible = !this.isDropdownVisible;
        },
        selectDay(day) {
            if (this.startDay === null) {
                this.startDay = day;
                this.selectedRange = [];
            } else if (this.endDay === null) {
                this.endDay = day;
                this.updateSelectedRange();
                this.startDay = null;
                this.endDay = null;
                this.isDropdownVisible = false;
            }
        },
        updateSelectedRange() {
            this.selectedRange = [Math.min(this.startDay, this.endDay), Math.max(this.startDay, this.endDay)];
            this.$emit('change', this.selectedRange);
        },
        getCellClass(day) {
            const classes = [];
            if (this.startDay !== null && day === this.startDay) {
                classes.push('range-start');
            } else if (this.selectedRange.length === 2 && day >= this.selectedRange[0] && day <= this.selectedRange[1]) {
                classes.push('in-range');
            } else if (this.startDay !== null && this.currentHoverDay !== null && day >= Math.min(this.startDay, this.currentHoverDay) && day <= Math.max(this.startDay, this.currentHoverDay)) {
                classes.push('in-hover');
            }
            return classes;
        },
        hoverDay(day) {
            if (this.startDay !== null) {
                this.currentHoverDay = day;
            }
        },
        checkOutsideClick(event) {
            if (!this.$el.contains(event.target)) {
                this.isDropdownVisible = false;
            }
        },
        clearSelection() {
            this.selectedRange = [];
            this.$emit('clear', this.selectedRange);
        }
    },
    beforeMount() {
        window.addEventListener('click', this.checkOutsideClick);
    },
    beforeDestroy() {
        window.removeEventListener('click', this.checkOutsideClick);
    }
};
</script>

<style scoped lang="scss">
.range-selector {
    position: relative;
    display: inline-block;
    border: 1px solid #032877;
    border-radius: 4px;
    box-sizing: border-box;

    &:hover {
        border: 1px solid #12c9f2;
    }

    .range-selector-trigger {
        padding: 0px;
        border: 0px solid #ccc;
        cursor: pointer;
        position: relative;
        display: inline-block;

        .input-wrapper {
            position: relative;
            display: inline-block;
        }

        &:hover .clear-button,
        .clear-button:focus {
            display: block;
        }

        .clear-button {
            position: absolute;
            right: 10px;
            top: 50%;
            transform: translateY(-50%);
            background: transparent;
            border: none;
            cursor: pointer;
            color: #a19e9e;
            display: none;
        }

        padding: 0px 10px;
        border: 0px solid #032877;
        cursor: pointer;
        position: relative;
        display: inline-block;
        height: 28px;
        line-height: 28px;
        background-color: #032877;
        border-radius: 4px;

        input {
            border: none;
            outline: none;
            background: none;
            box-shadow: none;
            -webkit-appearance: none;
            -moz-appearance: none;
            appearance: none;
            font-size: 14px;
            color: #fff;
            width: 100%;
            height: 100%;

            &::placeholder { // 添加了这里
                color: #fff;
            }
        }
    }

    .range-selector-dropdown {
        text-align: left;
        position: absolute;
        top: 100%;
        left: 0;
        padding: 6px 6px;
        border: 1px solid #e4e7ed;
        background-color: #fff;
        z-index: 9999;
        border-radius: 4px;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        margin-top: 2px;

        .calendar-cell {
            display: inline-block;
            border-radius: 6px;
            min-width: 30px;
            height: 30px;
            line-height: 30px;
            text-align: center;
            margin: 5px;
            cursor: pointer;
        }

        .in-range {
            background-color: #b3d8ff;
        }

        .range-start {
            background-color: #409eff;
            color: #fff;
        }

        .in-hover {
            background-color: #e1f3ff;
        }
    }
}

</style>