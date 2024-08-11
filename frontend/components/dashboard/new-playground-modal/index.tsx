"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Check, ChevronsUpDown, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useUser } from "@clerk/nextjs";
import { createPlayground } from "@/lib/actions";

const languages = [
  "typescript",
  "javascript",
  "python",
  "java",
  "ruby",
  "php",
  "csharp",
  "cpp",
  "go",
  "rust",
  "kotlin",
  "swift",
  // ... add all other languages from your list
] as const;

type Language = (typeof languages)[number];

interface NewPlaygroundModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const formSchema = z.object({
  name: z
    .string()
    .min(1)
    .max(30),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  visibility: z.enum(["public", "private"]),
  language: z.string(),
});

export function NewPlaygroundModal({
  isOpen,
  onClose,
}: NewPlaygroundModalProps) {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  // The "useUser" hook (i.e. function) allows us to access
  // information about the authenticated user, if there is one.
  const user = useUser();

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      visibility: "public",
      language: "cpp",
    },
  });

  // This function runs when the form is submitted.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("onSubmit function called", values);

    // if the user isn't sign-in, abort.
    console.log("User sign-in status:", user.isSignedIn);
    if (!user.isSignedIn) {
      console.log("User is not signed in, aborting submission");
      return;
    }

    setLoading(true);

    try {
      // form a json object using the form values (i.e. playground information)
      const playgroundData = {
        name: values.name,
        description: values.description,
        visibility: values.visibility,
        language: values.language,
        userId: user.user.id,
      };

      // Send an API request to the Database worker to Create the playground
      const id = await createPlayground(playgroundData);

      // redirect the user to the created playground page when playground is ready.
      router.push(`/code/${id}`);
    } catch (error) {
      // Handle any errors here
      console.error("Error creating playground:", error);
    } finally {
      setLoading(false); // Set loading back to false when submission completes
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Playground</DialogTitle>
          <DialogDescription>
            Describe what you want to learn and choose a programming language.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            autoComplete="off"
            onSubmit={(e) => {
              e.preventDefault();
              console.log("Form onSubmit triggered");
              form.handleSubmit(
                (values) => {
                  console.log("Form values:", values);
                  onSubmit(values).catch((error) =>
                    console.error("onSubmit error:", error)
                  );
                },
                (errors) => {
                  console.error("Form validation errors:", errors);
                }
              )(e);
            }}
            className="space-y-8"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="mb-4">
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="My Project"
                      {...field}
                      disabled={loading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe what you want to learn..."
                      {...field}
                      disabled={loading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="visibility"
              render={({ field }) => (
                <FormItem className="mb-8">
                  <FormLabel>Visibility</FormLabel>
                  <Select
                    disabled={loading}
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="public">Public</SelectItem>
                      <SelectItem value="private">Private</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Note: All sandboxes cannot be seen by the public. Private
                    sandboxes cannot be accessed by shared users that you add,
                    while public sandboxes can.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="language"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Language</FormLabel>
                  <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          aria-expanded={open}
                          className={cn(
                            "w-full justify-between",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value
                            ? languages.find(
                                (language) => language === field.value
                              )
                            : "Select language"}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0">
                      <Command>
                        <CommandInput placeholder="Search language..." />
                        <CommandList>
                          <CommandEmpty>No language found.</CommandEmpty>
                          <CommandGroup>
                            {languages.map((language) => (
                              <CommandItem
                                value={language}
                                key={language}
                                onSelect={() => {
                                  form.setValue("language", language);
                                  setOpen(false);
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    language === field.value
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                                {language}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="submit" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating...
                  </>
                ) : (
                  "Create Playground"
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
