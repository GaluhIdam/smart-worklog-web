import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Button from "../../../components/Button";
import Modal from "../../../components/Modal";
import type { CasesModel } from "../../../data/model/Cases/Cases.model";
import type { EmployeeResponse } from "../../../data/response/Employee/EmployeeResponse";

interface CaseModalProps {
  open: boolean;
  onClose: () => void;
  employees: EmployeeResponse[];
  caseData?: CasesModel | null;
  onSubmit: (data: CreateCaseFormData) => void | Promise<void>;
}

const createCaseSchema = z.object({
  case_number: z.string().trim().min(1, "Case number is required.").max(255, "Case number must not exceed 255 characters."),
  title: z.string().trim().min(1, "Title is required.").max(255, "Title must not exceed 255 characters."),
  description: z.string().trim().min(1, "Description is required."),
  status: z.enum(["", "open", "in_progress", "resolved", "closed", "cancelled"]).refine((value) => value !== "", {
    message: "Status is required.",
  }),
  priority: z.enum(["", "low", "medium", "high", "urgent"]).refine((value) => value !== "", {
    message: "Priority is required.",
  }),
  pic_ids: z.array(z.coerce.number()).min(1, "At least one PIC is required."),
  member_ids: z.array(z.coerce.number()).default([]),
});

type CreateCaseFormInput = z.input<typeof createCaseSchema>;
export type CreateCaseFormData = z.output<typeof createCaseSchema>;

const defaultValues: CreateCaseFormInput = {
  case_number: "",
  title: "",
  description: "",
  status: "",
  priority: "",
  pic_ids: [],
  member_ids: [],
};

const statusOptions = [
  { value: "open", label: "Open" },
  { value: "in_progress", label: "In Progress" },
  { value: "resolved", label: "Resolved" },
  { value: "closed", label: "Closed" },
  { value: "cancelled", label: "Cancelled" },
] as const;

const priorityOptions = [
  { value: "low", label: "Low" },
  { value: "medium", label: "Medium" },
  { value: "high", label: "High" },
  { value: "urgent", label: "Urgent" },
] as const;

const inputClass = (error = false) =>
  [
    "w-full rounded-lg border px-3 py-2 text-sm",
    "bg-white text-slate-900 placeholder:text-slate-400",
    "outline-none transition",
    "focus:border-slate-400 focus:ring-2 focus:ring-slate-100",
    error ? "border-red-300 focus:border-red-400 focus:ring-red-50" : "border-slate-200",
  ].join(" ");

const selectClass = (error = false) =>
  [
    "w-full rounded-lg border bg-white px-3 py-2",
    "text-sm text-slate-700 outline-none transition",
    "focus:border-slate-400 focus:ring-2 focus:ring-slate-100",
    error ? "border-red-300 focus:border-red-400 focus:ring-red-50" : "border-slate-200",
  ].join(" ");

const labelClass = "mb-1.5 block text-sm font-medium text-slate-700";
const errorClass = "mt-1 text-xs text-red-500";
const helpClass = "mt-1 text-xs text-slate-400";

export default function CaseModal({ open, onClose, employees, caseData, onSubmit }: CaseModalProps) {
  const isEdit = Boolean(caseData);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CreateCaseFormInput, unknown, CreateCaseFormData>({ resolver: zodResolver(createCaseSchema), defaultValues });

  useEffect(() => {
    if (!open) {
      return;
    }
    if (caseData) {
      reset({
        case_number: caseData.case_number ?? "",
        title: caseData.title ?? "",
        description: caseData.description ?? "",
        status: isValidStatus(caseData.status) ? caseData.status : "",
        priority: isValidPriority(caseData.priority) ? caseData.priority : "",
        pic_ids: caseData.pics?.map((pic) => pic.id) ?? [],
        member_ids: caseData.members?.map((member) => member.id) ?? [],
      });
      return;
    }
    reset(defaultValues);
  }, [open, caseData, reset]);

  const handleClose = () => {
    if (isSubmitting) {
      return;
    }
    reset(defaultValues);
    onClose();
  };

  const handleFormSubmit = async (data: CreateCaseFormData) => {
    await onSubmit(data);
    reset(defaultValues);
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      title={isEdit ? "Edit Case" : "Create Case"}
      description={isEdit ? "Update case information and assigned employees." : "Create a new case and assign the responsible employees."}
      size="lg"
      scrollable
      closeOnOverlay={!isSubmitting}
      closeOnEscape={!isSubmitting}
      footer={
        <>
          <Button variant="outline" type="button" onClick={handleClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button variant="primary" type="submit" form="case-form" disabled={isSubmitting}>
            {isSubmitting ? (isEdit ? "Saving..." : "Creating...") : isEdit ? "Save Changes" : "Create Case"}
          </Button>
        </>
      }>
      <form id="case-form" onSubmit={handleSubmit(handleFormSubmit)} noValidate className="space-y-5">
        {/* Case Number */}
        <div>
          <label htmlFor="case_number" className={labelClass}>
            Case Number
          </label>
          <input
            id="case_number"
            type="text"
            placeholder="CASE-000001"
            autoComplete="off"
            disabled={isSubmitting}
            {...register("case_number")}
            className={inputClass(!!errors.case_number)}
          />
          {errors.case_number && <p className={errorClass}> {errors.case_number.message} </p>}
        </div>

        {/* Title */}
        <div>
          <label htmlFor="title" className={labelClass}>
            Title
          </label>
          <input
            id="title"
            type="text"
            placeholder="Enter case title"
            autoComplete="off"
            disabled={isSubmitting}
            {...register("title")}
            className={inputClass(!!errors.title)}
          />
          {errors.title && <p className={errorClass}> {errors.title.message} </p>}
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className={labelClass}>
            Description
          </label>
          <textarea
            id="description"
            rows={4}
            placeholder="Describe the case..."
            disabled={isSubmitting}
            {...register("description")}
            className={`${inputClass(!!errors.description)} resize-none`}
          />
          {errors.description && <p className={errorClass}> {errors.description.message} </p>}
        </div>

        {/* Status & Priority */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {/* Status */}
          <div>
            <label htmlFor="status" className={labelClass}>
              Status
            </label>
            <select id="status" disabled={isSubmitting} {...register("status")} className={selectClass(!!errors.status)}>
              <option value="" disabled>
                Select status
              </option>
              {statusOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {errors.status && <p className={errorClass}> {errors.status.message} </p>}
          </div>

          {/* Priority */}
          <div>
            <label htmlFor="priority" className={labelClass}>
              Priority
            </label>
            <select id="priority" disabled={isSubmitting} {...register("priority")} className={selectClass(!!errors.priority)}>
              <option value="" disabled>
                Select priority
              </option>
              {priorityOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {errors.priority && <p className={errorClass}> {errors.priority.message} </p>}
          </div>
        </div>

        {/* PIC */}
        <div>
          <label htmlFor="pic_ids" className={labelClass}>
            PIC
          </label>
          <select
            id="pic_ids"
            multiple
            disabled={isSubmitting}
            {...register("pic_ids")}
            className={`${selectClass(!!errors.pic_ids)} min-h-28`}>
            {employees.map((employee) => (
              <option key={employee.id} value={employee.id}>
                {employee.user.name}
              </option>
            ))}
          </select>
          <p className={helpClass}> Select one or more employees responsible for this case. </p>
          {errors.pic_ids && <p className={errorClass}> {errors.pic_ids.message} </p>}
        </div>

        {/* Members */}
        <div>
          <label htmlFor="member_ids" className={labelClass}>
            Members
          </label>
          <select
            id="member_ids"
            multiple
            disabled={isSubmitting}
            {...register("member_ids")}
            className={`${selectClass(!!errors.member_ids)} min-h-28`}>
            {employees.map((employee) => (
              <option key={employee.id} value={employee.id}>
                {employee.user.name}
              </option>
            ))}
          </select>
          <p className={helpClass}> Select employees who are involved in this case. </p>
          {errors.member_ids && <p className={errorClass}> {errors.member_ids.message} </p>}
        </div>
      </form>
    </Modal>
  );
}

function isValidStatus(value: string): value is CreateCaseFormInput["status"] {
  return ["open", "in_progress", "resolved", "closed", "cancelled"].includes(value);
}

function isValidPriority(value: string): value is CreateCaseFormInput["priority"] {
  return ["low", "medium", "high", "urgent"].includes(value);
}
